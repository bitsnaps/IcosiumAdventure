<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-2 has-text-centered mb-6">Our Adventure Programmes</h1>

      <div class="programme-selector">
        <div class="tabs is-centered">
          <ul>
            <li :class="{ 'is-active': activeTab === 'standard' }">
              <a @click="activeTab = 'standard'">Standard Package</a>
            </li>
            <li :class="{ 'is-active': activeTab === 'adventure' }">
              <a @click="activeTab = 'adventure'">Adventure Plus</a>
            </li>
            <li :class="{ 'is-active': activeTab === 'custom' }">
              <a @click="activeTab = 'custom'">Custom Experience</a>
            </li>
          </ul>
        </div>

        <div class="content-area">
          <!-- Standard Package -->
          <div v-show="activeTab === 'standard'" class="programme-content">
            <div class="columns">
              <div class="column is-6">
                <div class="card">
                  <div class="card-content">
                    <h3 class="title is-4">Standard Package</h3>
                    <p class="subtitle is-5 has-text-primary">Starting at 2000 DA per person</p>
                    <div class="content">
                      <ul>
                        <li>Full-day team building experience</li>
                        <li>Team challenges and problem-solving activities</li>
                        <li>Leadership development exercises</li>
                        <li>Lunch and refreshments included</li>
                        <li>Professional facilitators</li>
                        <li>Certificate of completion</li>
                      </ul>
                    </div>
                    <router-link to="/booking" class="button is-primary is-fullwidth">Book Now</router-link>
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <figure class="image is-16by9">
                  <img src="../assets/standard-package.jpg" alt="Standard Package Activities">
                </figure>
                <div class="mt-4">
                  <h4 class="title is-5">Daily Schedule</h4>
                  <div class="timeline">
                    <div class="timeline-item">
                      <div class="timeline-content">
                        <p class="heading">09:00 AM</p>
                        <p>Welcome and Ice Breakers</p>
                      </div>
                    </div>
                    <div class="timeline-item">
                      <div class="timeline-content">
                        <p class="heading">10:30 AM</p>
                        <p>Team Challenges</p>
                      </div>
                    </div>
                    <div class="timeline-item">
                      <div class="timeline-content">
                        <p class="heading">12:30 PM</p>
                        <p>Lunch Break</p>
                      </div>
                    </div>
                    <div class="timeline-item">
                      <div class="timeline-content">
                        <p class="heading">02:00 PM</p>
                        <p>Leadership Activities</p>
                      </div>
                    </div>
                    <div class="timeline-item">
                      <div class="timeline-content">
                        <p class="heading">04:00 PM</p>
                        <p>Closing Session</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Adventure Plus -->
          <div v-show="activeTab === 'adventure'" class="programme-content">
            <div class="columns">
              <div class="column is-6">
                <div class="card">
                  <div class="card-content">
                    <h3 class="title is-4">Adventure Plus</h3>
                    <p class="subtitle is-5 has-text-primary">Starting at 3500 DA per person</p>
                    <div class="content">
                      <ul>
                        <li>All Standard Package features</li>
                        <li>Quad bike adventure session</li>
                        <li>Advanced team challenges</li>
                        <li>Outdoor survival skills</li>
                        <li>Professional photography</li>
                        <li>Exclusive team gear</li>
                      </ul>
                    </div>
                    <router-link to="/booking" class="button is-primary is-fullwidth">Book Now</router-link>
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <figure class="image is-16by9">
                  <img src="../assets/adventure-plus.jpg" alt="Adventure Plus Activities">
                </figure>
                <div class="mt-4">
                  <h4 class="title is-5">Featured Activities</h4>
                  <div class="tags are-medium">
                    <span class="tag is-primary">Quad Biking</span>
                    <span class="tag is-primary">Rock Climbing</span>
                    <span class="tag is-primary">Team Challenges</span>
                    <span class="tag is-primary">Survival Skills</span>
                    <span class="tag is-primary">Navigation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Custom Experience -->
          <div v-show="activeTab === 'custom'" class="programme-content">
            <div class="columns">
              <div class="column is-6">
                <div class="card">
                  <div class="card-content">
                    <h3 class="title is-4">Custom Experience</h3>
                    <p class="subtitle is-5 has-text-primary">Contact for pricing</p>
                    <div class="content">
                      <p>Create your perfect team building experience by choosing from our range of activities:</p>
                      <div class="field">
                        <label class="checkbox">
                          <input type="checkbox" v-model="customActivities" value="quad">
                          Quad Bike Adventures
                        </label>
                      </div>
                      <div class="field">
                        <label class="checkbox">
                          <input type="checkbox" v-model="customActivities" value="culinary">
                          Culinary Challenges
                        </label>
                      </div>
                      <div class="field">
                        <label class="checkbox">
                          <input type="checkbox" v-model="customActivities" value="creative">
                          Creative Workshops
                        </label>
                      </div>
                      <div class="field">
                        <label class="checkbox">
                          <input type="checkbox" v-model="customActivities" value="survival">
                          Survival Skills
                        </label>
                      </div>
                    </div>
                    <router-link to="/booking" class="button is-primary is-fullwidth">Request Quote</router-link>
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <div class="notification is-info">
                  <h4 class="title is-5">Why Choose Custom?</h4>
                  <div class="content">
                    <ul>
                      <li>Tailor activities to your team's needs</li>
                      <li>Flexible scheduling options</li>
                      <li>Choose your preferred location</li>
                      <li>Customize team size and duration</li>
                      <li>Add specific learning objectives</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('standard')
const customActivities = ref([])
</script>

<style scoped>
.programme-content {
  margin-top: 2rem;
}

.timeline {
  margin-top: 1rem;
}

.timeline-item {
  padding: 1rem 0;
  border-left: 2px solid #dbdbdb;
  position: relative;
  padding-left: 2rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 1.5rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #485fc7;
}

.timeline-content {
  padding: 0.5rem;
}

.timeline-content .heading {
  font-weight: bold;
  color: #485fc7;
}
</style>