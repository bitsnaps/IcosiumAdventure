<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">
        <!-- Company Info -->
        <div class="column is-4 has-text-dark">
          <h3 class="title is-4 mb-4 has-text-dark">Adventure Ecosium</h3>
          <p class="mb-4">Transform your team through unique outdoor experiences and adventure-based team building activities.</p>
          <div class="social-icons">
            <a href="#" class="icon is-medium">
              <i class="fab fa-facebook fa-lg"></i>
            </a>
            <a href="#" class="icon is-medium">
              <i class="fab fa-instagram fa-lg"></i>
            </a>
            <a href="#" class="icon is-medium">
              <i class="fab fa-linkedin fa-lg"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="column is-2 is-offset-1">
          <h3 class="title is-5 mb-4 has-text-dark">Quick Links</h3>
          <ul class="footer-links">
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/programmes">Our Programs</router-link></li>
            <li><router-link to="/blog">Blog</router-link></li>
            <li><router-link to="/booking">Book Now</router-link></li>
          </ul>
        </div>

        <!-- Programs -->
        <div class="column is-2">
          <h3 class="title is-5 mb-4 has-text-dark">Programs</h3>
          <ul class="footer-links">
            <li><a href="#">Standard Package</a></li>
            <li><a href="#">Adventure Plus</a></li>
            <li><a href="#">Custom Experience</a></li>
            <li><a href="#">Corporate Events</a></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="column is-3">
          <h3 class="title is-5 mb-4 has-text-dark">Contact Us</h3>
          <ul class="footer-contact">
            <li>
              <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
              <span>Algiers, Algeria</span>
            </li>
            <li>
              <span class="icon"><i class="fas fa-phone"></i></span>
              <span>+213 XX XX XX XX</span>
            </li>
            <li>
              <span class="icon"><i class="fas fa-envelope"></i></span>
              <span>contact@adventureecosium.com</span>
            </li>
          </ul>
        </div>
      </div>

      <hr class="footer-divider">
      
      <!-- Copyright -->
      <div class="columns">
        <div class="column">
          <p class="has-text-centered">
            © {{ currentYear }} Adventure Ecosium. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background-color: #f5f5f5;
  padding: 3rem 1.5rem;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: #4a4a4a;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #485fc7;
}

.footer-contact li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #4a4a4a;
}

.footer-contact .icon {
  margin-right: 0.75rem;
  color: #485fc7;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icons .icon {
  color: #4a4a4a;
  transition: color 0.3s ease;
}

.social-icons .icon:hover {
  color: #485fc7;
}

.footer-divider {
  margin: 2rem 0;
  background-color: #dbdbdb;
  height: 1px;
}

@media screen and (max-width: 768px) {
  .column {
    margin-bottom: 2rem;
  }
}
</style>