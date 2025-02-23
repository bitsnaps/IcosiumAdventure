<template>
  <div class="about-container">
    <h1>About Icosium Adventure</h1>
    
    <section class="mission">
      <h2>Our Mission</h2>
      <p>Icosium Adventure is dedicated to bringing the rich history and culture of Algeria to life through immersive gaming experiences. We strive to create engaging adventures that educate and entertain while preserving our heritage.</p>
    </section>

    <section class="story">
      <h2>Our Story</h2>
      <p>Founded by passionate developers and historians, Icosium Adventure takes its name from the ancient Phoenician settlement that later became modern-day Algiers. Our team combines cutting-edge technology with historical accuracy to create unique gaming experiences.</p>
    </section>

    <section class="team">
      <h2>Our Team</h2>
      <div class="team-grid">
        <div class="team-member">
          <h3>Game Developers</h3>
          <p>Expert programmers crafting interactive experiences</p>
        </div>
        <div class="team-member">
          <h3>Historians</h3>
          <p>Ensuring historical accuracy and authenticity</p>
        </div>
        <div class="team-member">
          <h3>Artists</h3>
          <p>Creating stunning visuals inspired by Algerian culture</p>
        </div>
      </div>
    </section>

    <section class="contact">
      <h2>Contact Us</h2>
      <p>Have questions or feedback? Reach out to us at:</p>
      <a href="mailto:contact@icosiumadventure.com">contact@icosiumadventure.com</a>
    </section>
  </div>
</template>

<script>
export default {
  name: 'About',
}
</script>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 3rem;
}

section {
  margin-bottom: 4rem;
}

h2 {
  color: #42b983;
  margin-bottom: 1.5rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.team-member {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
}

.team-member h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.contact {
  text-align: center;
}

.contact a {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

.contact a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .about-container {
    padding: 1rem;
  }
  
  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style>
