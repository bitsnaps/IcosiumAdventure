<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <div class="box">
            <h2 class="title is-3">Book Your Adventure</h2>
            
            <div class="field">
              <label class="label">Team Size</label>
              <div class="control">
                <input v-model="booking.teamSize" class="input" type="number" min="5" placeholder="Number of participants">
              </div>
            </div>

            <div class="field">
              <label class="label">Company/Organization Name</label>
              <div class="control">
                <input v-model="booking.organization" class="input" type="text" placeholder="Your company name">
              </div>
            </div>

            <div class="field">
              <label class="label">Contact Person</label>
              <div class="control has-icons-left">
                <input v-model="booking.contactName" class="input" type="text" placeholder="Full name">
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left">
                <input v-model="booking.email" class="input" type="email" placeholder="Email address">
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label">Phone</label>
              <div class="control has-icons-left">
                <input v-model="booking.phone" class="input" type="tel" placeholder="Phone number">
                <span class="icon is-small is-left">
                  <i class="fas fa-phone"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label">Preferred Date</label>
              <div class="control">
                <input v-model="booking.date" class="input" type="date">
              </div>
            </div>

            <div class="field">
              <label class="label">Package Type</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="booking.package">
                    <option value="">Select a package</option>
                    <option value="standard">Standard Package</option>
                    <option value="adventure">Adventure Plus</option>
                    <option value="custom">Custom Experience</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label">Additional Requirements</label>
              <div class="control">
                <textarea v-model="booking.requirements" class="textarea" placeholder="Any special requirements or preferences?"></textarea>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button @click="submitBooking" class="button is-primary is-fullwidth">
                  Submit Booking Request
                </button>
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

const booking = ref({
  teamSize: '',
  organization: '',
  contactName: '',
  email: '',
  phone: '',
  date: '',
  package: '',
  requirements: ''
})

const submitBooking = () => {
  // TODO: Implement booking submission logic
  console.log('Booking submitted:', booking.value)
}
</script>

<style scoped>
.field {
  margin-bottom: 1.5rem;
}
</style>