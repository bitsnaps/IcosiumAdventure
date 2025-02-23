
<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
<nav class="navbar is-transparent">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="/logo.svg" alt="Adventure Ecosium">
      </router-link>

      <a role="button" class="navbar-burger" :class="{ 'is-active': isMenuOpen }" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': isMenuOpen }">
      <div class="navbar-end">
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link class="navbar-item" to="/about">About</router-link>
        <router-link class="navbar-item" to="/programmes">Programmes</router-link>
        <router-link class="navbar-item" to="/booking">Booking</router-link>
        <router-link class="navbar-item" to="/blog">Blog</router-link>
      </div>
    </div>
  </nav>
</template>