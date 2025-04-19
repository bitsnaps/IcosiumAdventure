const { Hono } = require('hono');

/**
 * An in-memory store that tracks client hit counts.
 * (Based on the repository’s MemoryStore implementation.)
 */
class MemoryStore {
  constructor() {
    // Duration (in ms) for which the window is active.
    this.windowMs = 0;
    // Two maps to hold clients from the current and previous window.
    this.previous = new Map();
    this.current = new Map();
    this.interval = null;
  }

  init(options) {
    this.windowMs = options.windowMs;
    if (this.interval) clearInterval(this.interval);

    // Every windowMs milliseconds, drop clients from the previous window.
    this.interval = setInterval(() => this.clearExpired(), this.windowMs);

    // If running on Node and available, allow the process to exit naturally.
    if (this.interval.unref) this.interval.unref();
  }

  get(key) {
    return this.current.get(key) || this.previous.get(key);
  }

  increment(key) {
    const client = this._getClient(key);
    const now = Date.now();
    if (client.resetTime <= now) {
      this._resetClient(client, now);
    }
    client.totalHits++;
    return client;
  }

  decrement(key) {
    const client = this._getClient(key);
    if (client.totalHits > 0) {
      client.totalHits--;
    }
  }

  resetKey(key) {
    this.current.delete(key);
    this.previous.delete(key);
  }

  resetAll() {
    this.current.clear();
    this.previous.clear();
  }

  shutdown() {
    clearInterval(this.interval);
    this.resetAll();
  }

  _resetClient(client, now = Date.now()) {
    client.totalHits = 0;
    // resetTime is a timestamp (in ms) set to now plus the window duration.
    client.resetTime = now + this.windowMs;
    return client;
  }

  _getClient(key) {
    let client = this.current.get(key);
    if (client) return client;
    client = this.previous.get(key);
    if (client) {
      // Once the client makes a new request, remove it from the previous window.
      this.previous.delete(key);
    } else {
      // If no record exists yet, create a new one.
      client = { totalHits: 0, resetTime: Date.now() };
      this._resetClient(client);
    }
    this.current.set(key, client);
    return client;
  }

  clearExpired() {
    // Every window, the current window becomes previous and a new current window is started.
    this.previous = this.current;
    this.current = new Map();
  }
}

/**
 * Utility function to initialize the store.
 */
function initStore(store, options) {
  if (typeof store.init === "function") {
    store.init(options);
  }
}

/**
 * Utility function that gets the key (by calling the provided keyGenerator)
 * and increments its count in the store.
 */
async function getKeyAndIncrement(c, keyGenerator, store) {
  const key = await keyGenerator(c);
  const result = store.increment(key);
  return {
    key,
    totalHits: result.totalHits,
    resetTime: new Date(result.resetTime),
  };
}

/**
 * Functions to set standardized rate-limit headers.
 *
 * Depending on the chosen standard (e.g. "draft-6" or "draft-7"), these functions
 * set headers like RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset, and retry-after.
 */
function setDraft6Headers(c, info) {
  c.res.headers.set("RateLimit-Limit", info.limit);
  c.res.headers.set("RateLimit-Remaining", info.remaining);
  const resetSeconds = Math.ceil((info.resetTime.getTime() - Date.now()) / 1000);
  c.res.headers.set("RateLimit-Reset", resetSeconds);
}

function setDraft7Headers(c, info) {
  // For this example, we implement draft-7 the same as draft-6.
  setDraft6Headers(c, info);
}

function setRetryAfterHeader(c, info) {
  const retryAfterSeconds = Math.ceil(
    (info.resetTime.getTime() - Date.now()) / 1000
  );
  c.res.headers.set("Retry-After", retryAfterSeconds);
}

/**
 * The main rateLimiter middleware.
 * It uses the provided options and the memory store to track and enforce limits.
 */
function rateLimiter(config) {
  const {
    windowMs = 60000, // default window duration: 1 minute
    limit = 5, // default max number of requests per window
    message = "Too many requests, please try again later.",
    statusCode = 429,
    standardHeaders = "draft-6", // or "draft-7"
    requestPropertyName = "rateLimit",
    requestStorePropertyName = "rateLimitStore",
    skipFailedRequests = false,
    skipSuccessfulRequests = false,
    keyGenerator, // a function to generate a unique key for a client
    skip = () => false,
    requestWasSuccessful = (c) => c.res.status < 400,
    handler = async (c, next, options) => {
      c.status(options.statusCode);
      if (typeof options.message === "function") {
        return c.text(await options.message(c));
      } else {
        return c.text(options.message);
      }
    },
    store = new MemoryStore(),
  } = config;

  const options = {
    windowMs,
    limit,
    message,
    statusCode,
    standardHeaders,
    requestPropertyName,
    requestStorePropertyName,
    skipFailedRequests,
    skipSuccessfulRequests,
    keyGenerator,
    skip,
    requestWasSuccessful,
    handler,
    store,
  };

  // Initialize the store (for example, start the cleanup timer).
  initStore(store, options);

  return async (c, next) => {
    // Check if the rate limit should be skipped for this request.
    const isSkippable = await skip(c);
    if (isSkippable) {
      await next();
      return;
    }

    // Generate a key and increment its counter.
    const { key, totalHits, resetTime } = await getKeyAndIncrement(
      c,
      keyGenerator,
      store
    );

    // Determine the maximum allowed hits. Allow limit to be a function.
    const _limit = typeof limit === "function" ? await limit(c) : limit;

    // Create the rate limit info object.
    const info = {
      limit: _limit,
      used: totalHits,
      remaining: Math.max(_limit - totalHits, 0),
      resetTime,
    };

    // Save info and store functions in the context (if needed later).
    c.set(requestPropertyName, info);
    c.set(requestStorePropertyName, {
      getKey: store.get.bind(store),
      resetKey: store.resetKey.bind(store),
    });

    // Set the appropriate rate limit headers.
    if (standardHeaders && !c.finalized) {
      if (standardHeaders === "draft-7") {
        setDraft7Headers(c, info);
      } else {
        setDraft6Headers(c, info);
      }
    }

    // Prepare for possibly decrementing the counter based on the request outcome.
    let decremented = false;
    const decrementKey = async () => {
      if (!decremented) {
        store.decrement(key);
        decremented = true;
      }
    };

    const shouldSkipRequest = async () => {
      if (skipFailedRequests || skipSuccessfulRequests) {
        const wasRequestSuccessful = await requestWasSuccessful(c);
        if (
          (skipFailedRequests && !wasRequestSuccessful) ||
          (skipSuccessfulRequests && wasRequestSuccessful)
        )
          await decrementKey();
      }
    };

    // If the client has exceeded the limit, send the error response.
    if (totalHits > _limit) {
      if (standardHeaders) {
        setRetryAfterHeader(c, info);
      }
      await shouldSkipRequest();
      return handler(c, next, options);
    }

    try {
      await next();
      await shouldSkipRequest();
    } catch (error) {
      if (skipFailedRequests) await decrementKey();
      throw error;
    } finally {
      if (!c.finalized) await decrementKey();
    }
  };
}


// Export the rateLimiter function and MemoryStore class
module.exports = {
  rateLimiter,
  MemoryStore
};


/**
 * Sample Hono application that makes use of the rateLimiter middleware.
 * 
 * In this example, the keyGenerator uses the "x-forwarded-for" header (or falls back to the IP)
 * to compute a unique key per client.
 *
const app = new Hono();

app.use(
  rateLimiter({
    windowMs: 60000, // 1 minute window
    limit: 10, // limit each client to 10 requests per window
    keyGenerator: (c) =>
      c.req.headers.get("x-forwarded-for") || c.req.ip,
  })
);

app.get("/", (c) => c.text("Hello, world!"));

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
*/