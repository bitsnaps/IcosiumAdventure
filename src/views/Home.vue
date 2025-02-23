<template>
  <!-- First Section: Hero -->
  <section class="hero is-white is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered reverse-columns">
          <div class="column is-10-mobile is-10-tablet is-5-desktop is-5-widescreen is-5-fullhd" data-aos="fade-down">
            <h1 class="title titled is-1 mb-6">
              Transform Your Team Through Adventure
            </h1>
            <h2 class="subtitle subtitled mb-6">
              Experience unique team-building activities in the heart of nature, designed to strengthen bonds and inspire leadership.
            </h2>
            <div class="buttons">
              <router-link to="/programmes" class="button is-primary is-large">
                Discover Our Journeys
              </router-link>
            </div>
          </div>
          <div data-aos="fade-right" class="column is-10-mobile is-10-tablet is-4-desktop is-7-widescreen is-4-fullhd is-offset-1-fullhd">
            <figure class="image is-square">
              <img src="../assets/images/collaboration.jpg" alt="Team building activities">
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Second Section: Why Choose Us -->
  <section class="hero is-white is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div data-aos="fade-left" class="column is-10-mobile is-offset-1-mobile is-4-desktop is-offset-1-desktop">
            <figure class="image is-square">
              <img src="../assets/images/team-work.jpg" alt="Team Work">
            </figure>
          </div>
          <div data-aos="fade-down" class="column is-10-mobile is-offset-1-mobile is-5-desktop is-offset-1-desktop">
            <h1 class="titled title is-1 mb-6">
              Adventure Meets Team Building
            </h1>
            <h2 class="subtitled subtitle">
              From quad bike adventures to creative workshops, our programs combine excitement with purposeful team development. Create lasting memories while building stronger teams.
            </h2>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Third Section: Our Impact -->
  <section class="hero is-white is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered reverse-columns">
          <div data-aos="fade-right" class="column is-10-mobile is-offset-1-mobile is-5-desktop is-offset-1-desktop">
            <h1 class="title titled is-1 mb-6">
              Real Results, Lasting Impact
            </h1>
            <h2 class="subtitle subtitled">
              Our programs have helped hundreds of teams improve communication, boost morale, and develop leadership skills through engaging outdoor experiences.
            </h2>
          </div>
          <div data-aos="fade-down" class="column is-10-mobile is-offset-1-mobile is-4-desktop is-offset-1-desktop">
            <figure class="image is-square">
              <img src="../assets/images/team-success.jpg" alt="Team success moment">
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Fourth Section: Call to Action -->
  <section class="hero is-medium has-text-centered">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div data-aos="zoom-in-up" class="column is-8">
            <h1 class="title titled is-1 mb-6">
              Ready to Transform Your Team?
            </h1>
            <h2 class="subtitle subtitled mb-6">
              Join the hundreds of organizations that have discovered the power of adventure-based team building. Book your experience today and start your journey to team excellence.
            </h2>
            <router-link to="/booking" class="button is-primary is-large">
              Book Now
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
[data-aos] {
  pointer-events: none;
}
[data-aos].aos-animate {
  pointer-events: auto;
}

.aos-init[data-aos][data-aos].aos-animate {
  transform: unset;
}

.image img {
  object-fit: cover;
  border-radius: 8px;
}

.hero-body {
  padding: 3rem 1.5rem;
}

.subtitle {
  color: #4a4a4a;
  line-height: 1.6;
}
</style>