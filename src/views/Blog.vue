<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-2 has-text-centered has-text-white mb-6" data-aos="fade-down">
        Adventure Stories & Team Building Tips
      </h1>

      <!-- Featured Post -->
      <div class="card featured-post mb-6" data-aos="fade-up">
        <div class="columns is-vcentered">
          <div class="column is-7">
            <div class="card-image">
              <figure class="image is-16by9">
                <img src="/blog/01.jpeg" alt="Team building success story">
              </figure>
            </div>
          </div>
          <div class="column is-5">
            <div class="card-content">
              <p class="subtitle is-6 mb-2">Featured Story • {{ formatDate(featuredPost.date) }}</p>
              <h2 class="title is-3">{{ featuredPost.title }}</h2>
              <p class="content mb-5">{{ featuredPost.excerpt }}</p>
              <button class="button is-primary is-medium">Read More</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Blog Posts Grid -->
      <div class="columns is-multiline">
        <div v-for="post in posts" :key="post.id" class="column is-4" data-aos="fade-up" :data-aos-delay="post.id * 100">
          <div class="card blog-card">
            <div class="card-image">
              <figure class="image is-3by2">
                <img :src="`/blog/${post.image}`" :alt="post.title">
              </figure>
            </div>
            <div class="card-content">
              <p class="subtitle is-6 mb-2">{{ post.category }} • {{ formatDate(post.date) }}</p>
              <h3 class="title is-4">{{ post.title }}</h3>
              <p class="content">{{ post.excerpt }}</p>
              <button class="button is-primary is-outlined is-medium">Read More</button>
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
  image: "02.jpeg"
})

const posts = ref([
  {
    id: 1,
    title: "5 Creative Team Building Activities That Actually Work",
    category: "Tips & Tricks",
    date: "2024-01-10",
    excerpt: "Explore innovative team building exercises that foster genuine connections and improve collaboration.",
    image: "03.jpeg"
  },
  {
    id: 2,
    title: "Success Story: Tech Startup's Desert Adventure",
    category: "Case Study",
    date: "2024-01-05",
    excerpt: "See how a weekend adventure helped this startup team strengthen their bonds and improve communication.",
    image: "04.jpeg"
  },
  {
    id: 3,
    title: "Leadership Lessons from the Great Outdoors",
    category: "Leadership",
    date: "2023-12-28",
    excerpt: "What nature can teach us about effective leadership and team management.",
    image: "05.jpeg"
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
.featured-post {
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.featured-post:hover {
  transform: translateY(-5px);
}

.blog-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
}

.card-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.card-content .button {
  margin-top: auto;
  align-self: flex-start;
}

.image img {
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.featured-post .image img {
  border-radius: 8px 0 0 8px;
}

.title {
  color: #363636;
  line-height: 1.4;
}

.subtitle {
  color: #7a7a7a;
}

.content {
  color: #4a4a4a;
  line-height: 1.6;
}

[data-aos] {
  pointer-events: none;
}

[data-aos].aos-animate {
  pointer-events: auto;
}

@media screen and (max-width: 768px) {
  .featured-post .columns {
    flex-direction: column;
  }

  .featured-post .image img {
    border-radius: 8px 8px 0 0;
  }

  .card-content {
    padding: 1.5rem;
  }
}
</style>