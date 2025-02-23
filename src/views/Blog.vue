<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-2 mb-6">Adventure Stories & Team Building Tips</h1>

      <!-- Featured Post -->
      <div class="card mb-6">
        <div class="card-image">
          <figure class="image is-16by9">
            <img src="../assets/blog/01.jpeg" alt="Team building success story">
          </figure>
        </div>
        <div class="card-content">
          <p class="subtitle is-6 mb-2">Featured Story • {{ formatDate(featuredPost.date) }}</p>
          <h2 class="title is-3">{{ featuredPost.title }}</h2>
          <p class="content">{{ featuredPost.excerpt }}</p>
          <button class="button is-primary">Read More</button>
        </div>
      </div>

      <!-- Blog Posts Grid -->
      <div class="columns is-multiline">
        <div v-for="post in posts" :key="post.id" class="column is-4">
          <div class="card">
            <div class="card-image">
              <figure class="image is-3by2">
                <img :src="post.image" :alt="post.title">
              </figure>
            </div>
            <div class="card-content">
              <p class="subtitle is-6 mb-2">{{ post.category }} • {{ formatDate(post.date) }}</p>
              <h3 class="title is-4">{{ post.title }}</h3>
              <p class="content">{{ post.excerpt }}</p>
              <button class="button is-primary is-outlined">Read More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const featuredPost = ref({
  title: "How Team Building Adventures Transform Company Culture",
  date: "2024-01-15",
  excerpt: "Discover how outdoor team activities can create lasting positive changes in your organization's culture and employee relationships.",
  image: "../assets/blog/02.jpeg"
})

const posts = ref([
  {
    id: 1,
    title: "5 Creative Team Building Activities That Actually Work",
    category: "Tips & Tricks",
    date: "2024-01-10",
    excerpt: "Explore innovative team building exercises that foster genuine connections and improve collaboration.",
    image: "../assets/blog/03.jpeg"
  },
  {
    id: 2,
    title: "Success Story: Tech Startup's Desert Adventure",
    category: "Case Study",
    date: "2024-01-05",
    excerpt: "See how a weekend adventure helped this startup team strengthen their bonds and improve communication.",
    image: "../assets/blog/04.jpeg"
  },
  {
    id: 3,
    title: "Leadership Lessons from the Great Outdoors",
    category: "Leadership",
    date: "2023-12-28",
    excerpt: "What nature can teach us about effective leadership and team management.",
    image: "../assets/blog/05.jpeg"
  }
])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-content .button {
  margin-top: auto;
}

.image img {
  object-fit: cover;
}
</style>