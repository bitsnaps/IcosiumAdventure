<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-2 has-text-centered mb-6" data-aos="fade-down">About Adventure Ecosium</h1>
      
      <div class="columns is-vcentered mb-6">
        <div class="column is-6" data-aos="fade-right">
          <h2 class="title is-3 mb-4">Our Mission</h2>
          <p class="subtitle is-5">
            Adventure Ecosium is dedicated to transforming teams through immersive outdoor experiences. We create engaging adventures that challenge, inspire, and unite teams while fostering lasting professional relationships.
          </p>
        </div>
        <div class="column is-6" data-aos="fade-left">
          <figure class="image is-16by9">
            <img src="../assets/mission.jpg" alt="Team building mission" class="has-shadow">
          </figure>
        </div>
      </div>

      <div class="columns is-vcentered mb-6 reverse-columns">
        <div class="column is-6" data-aos="fade-right">
          <figure class="image is-16by9">
            <img src="../assets/team.jpg" alt="Team" class="has-shadow">
          </figure>
        </div>
        <div class="column is-6" data-aos="fade-left">
          <h2 class="title is-3 mb-4">Our Story</h2>
          <p class="subtitle is-5">
            Founded by passionate outdoor enthusiasts and team development experts, Adventure Ecosium combines adventure sports with professional development. Our journey began with a simple belief: great teams are built through shared experiences and challenges.
          </p>
        </div>
      </div>

      <div class="team-section mt-6 pt-6">
        <h2 class="title is-3 has-text-centered mb-6" data-aos="fade-up">Our Team</h2>
        <div class="columns is-multiline">
          <div class="column is-4" data-aos="zoom-in" data-aos-delay="100">
            <div class="card">
              <div class="card-content has-text-centered">
                <span class="icon is-large mb-4">
                  <i class="fas fa-users fa-3x"></i>
                </span>
                <h3 class="title is-4">Facilitators</h3>
                <p class="subtitle is-6">Expert guides leading transformative team experiences</p>
              </div>
            </div>
          </div>
          <div class="column is-4" data-aos="zoom-in" data-aos-delay="200">
            <div class="card">
              <div class="card-content has-text-centered">
                <span class="icon is-large mb-4">
                  <i class="fas fa-mountain fa-3x"></i>
                </span>
                <h3 class="title is-4">Adventure Experts</h3>
                <p class="subtitle is-6">Certified professionals ensuring safe and exciting activities</p>
              </div>
            </div>
          </div>
          <div class="column is-4" data-aos="zoom-in" data-aos-delay="300">
            <div class="card">
              <div class="card-content has-text-centered">
                <span class="icon is-large mb-4">
                  <i class="fas fa-brain fa-3x"></i>
                </span>
                <h3 class="title is-4">Development Coaches</h3>
                <p class="subtitle is-6">Specialists in team dynamics and leadership growth</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="contact-section has-text-centered mt-6 pt-6" data-aos="fade-up">
        <h2 class="title is-3 mb-4">Get in Touch</h2>
        <p class="subtitle is-5 mb-5">Ready to start your team's adventure? Contact us today!</p>
        <div class="buttons is-centered">
          <a href="mailto:contact@adventureecosium.com" class="button is-primary is-medium">
            <span class="icon">
              <i class="fas fa-envelope"></i>
            </span>
            <span>Email Us</span>
          </a>
          <a href="tel:+213XXXXXXXXX" class="button is-light is-medium">
            <span class="icon">
              <i class="fas fa-phone"></i>
            </span>
            <span>Call Us</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Component logic here if needed
</script>

<style scoped>
.card {
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  height: 100%;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.image img {
  object-fit: cover;
  border-radius: 8px;
}

.has-shadow {
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.icon.is-large {
  height: 3rem;
  width: 3rem;
  color: #485fc7;
}

.contact-section {
  background-color: #f5f5f5;
  padding: 3rem;
  border-radius: 8px;
}

.reverse-columns {
  flex-direction: row-reverse;
}

@media screen and (max-width: 768px) {
  .reverse-columns {
    flex-direction: column-reverse;
  }
  
  .column {
    padding: 1.5rem;
  }
}

[data-aos] {
  pointer-events: none;
}

[data-aos].aos-animate {
  pointer-events: auto;
}
</style>