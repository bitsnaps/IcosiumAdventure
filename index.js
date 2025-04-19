const { serve } = require('@hono/node-server');
const { Hono } = require('hono');
const { serveStatic } = require('@hono/node-server/serve-static');
const { readFile } = require('node:fs/promises');
const nodemailer = require('nodemailer');
const { rateLimiter } = require('./honoRateLimiter');

const MAX_TIMESTAMP_AGE_MS = 15 * 60 * 1000; // 15 minutes validity for timestamp/token


// TEST: Create a test account for Ethereal Email
async function createTestAccount() {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });
}

let transporter;
createTestAccount().then(t => {
    transporter = t;
    console.log('Email test account created');
});

const EMAIL_CONTACT = process.env.EMAIL_CONTACT || 'admin@email.com';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

/*/ PROD: Configure email transporter
const transporter = nodemailer.createTransport({
    host: 'mail.ecosiumevent.com', // Replace with your SMTP host ('smtp.example.com')
    port: 465, //993, // Common SMTP port (587 worked with secure:false)
    secure: true, // true for 465, false for other ports
    auth: {
      user: EMAIL_CONTACT, // Replace with your email
      pass: EMAIL_PASSWORD // Replace with your password or app-specific password
    },
  });
*/

const app = new Hono();

// app.use('/static/*', serveStatic({ root: './' }));
// Anything comes from static folder will be served from "/"
app.use('/*', serveStatic({ root: './static' }));

// Apply the rate limiting middleware to all requests.
app.use(
    rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `windowMs` (here, per 15 minutes).
    // standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    keyGenerator: (c) => c.req.header('x-forwarded-for') || c.req.ip || 'unknown',
    message: 'Too many requests from this IP, please try again after a minute'
    // keyGenerator: (c) => "<unique_key>", // Method to generate custom identifiers for clients.
    // store: ... , // Redis, MemoryStore, etc. See below.
  })
);

// app.get('/', async (c) => {
// 	const home = await readFile('./index.html', 'utf8');	
//     return c.html(home);
// });

// app.get('/fr', async (c) => {
// 	const home = await readFile('./fr/index.html', 'utf8');	
//     return c.html(home);
// });

app.get('/csrf', async (c) => {
    const ts = c.req.query('ts');
    if (!ts){
        return c.json({ secret: '', stamp: 0, }, 400);
    }
    const token = crypto.createHash('sha256').update(ts).digest('hex');
    return c.json({
        secret: token,
        stamp: Date.now()-parseInt(ts),
    });
});

app.post('/contact', async (c) => {
    const genericErrorMessage = 'An error occurred while processing your request. Please try again later.';
    try {
        
        // Get the x_csrf_token from headers
        const x_csrf_token = c.req.header('x-csrf-token');

        // Parse the form data from the request
        // const formData = await c.req.json(); // use this when data encoded as JSON object
        const formData = await c.req.parseBody(); // when data encoded as form-data
        console.log(formData);
        
        // Extract form fields
        const { name, email, tel, company, message, form_timestamp, csrf_token, timestamp } = formData;
        console.log(name, email, message, form_timestamp);
        
        // 1. Check for honeypot (timestamp)
        if (timestamp) {
            return c.json({ success: false, message: genericErrorMessage }, 500);
        }

        // 2. Basic validation
        if (!name || !email || !message || !form_timestamp || !csrf_token) {
            return c.json({ success: false, message: 'Missing required fields' }, 400);
        }        
        
        // 3. Timestamp Check
        const receivedTimestamp = parseInt(form_timestamp, 10);

        if (isNaN(receivedTimestamp)) {
            console.warn('Security Fail: Invalid timestamp format.');
            return c.json({ success: false, message: genericErrorMessage }, 500);
        }

        const requestTimestamp = parseInt(x_csrf_token.split('-').splice(-1)[0], 10);
        if (
            ((Date.now() - receivedTimestamp) > MAX_TIMESTAMP_AGE_MS) || 
            (Date.now() - requestTimestamp > MAX_TIMESTAMP_AGE_MS)){
            console.warn(`Security Fail: Timestamp too old.`);
            return c.json({ success: false, message: 'Submission expired. Please refresh and try again.' }, 403);
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return c.json({ success: false, message: 'Invalid email format' }, 400);
        }
        

        // Implement email sending
        if (transporter) {
            try {
                const mailOptions = {
                    from: `"ECOSIUM EVENT" <${EMAIL_CONTACT}>`, // Sender address
                    to: `${email},${EMAIL_CONTACT}`, // List of recipients
                    replyTo: `${EMAIL_CONTACT}`, // Set reply-to as the form submitter's email
                    subject: `Request from ${name}`,
                    html: `
                        <h2>Request form Submission</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        ${tel ? `<p><strong>Phone:</strong> ${tel}</p>` : ''}
                        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
                        <p><strong>Message:</strong></p>
                        <p>${message.replace(/\n/g, '<br>')}</p>
                        <hr>
                        <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
                    `
                };
                
                const info = await transporter.sendMail(mailOptions);
                //console.log('Contact form submission:', { name, email, message });
                //console.log('Email sent: %s', info.messageId);
                //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                return c.json({ 
                    success: true, 
                    message: `Thank you ${name} for your message! We will get back to you soon.`
                    //message: `Thank you ${name} for your message! Email sent to: ${email}. We will get back to you soon.`
                });

            } catch (emailError) {
                //console.error('Error sending email:', emailError);
                return c.json({ 
                    success: false, 
                    message: `Error sending email: ${emailError}`
                });
            }
        }
    } catch (error) {
        console.error('Error processing contact form:', error);
        return c.json({ success: false, message: genericErrorMessage }, 500);
    }
});

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`) // Listening on http://localhost:3000
})