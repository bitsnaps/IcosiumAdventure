<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-8">
          <h1 class="title is-2 has-text-centered mb-6">Book Your Adventure</h1>
          
          <div class="box booking-form">
            <div class="columns is-multiline">
              <!-- Team Size & Organization -->
              <div class="column is-6">
                <div class="field">
                  <label class="label">Team Size</label>
                  <div class="control">
                    <input v-model="booking.teamSize" class="input" type="number" min="5" placeholder="Number of participants">
                  </div>
                </div>
              </div>
              
              <div class="column is-6">
                <div class="field">
                  <label class="label">Company/Organization Name</label>
                  <div class="control">
                    <input v-model="booking.organization" class="input" type="text" placeholder="Your company name">
                  </div>
                </div>
              </div>

              <!-- Contact Person & Email -->
              <div class="column is-6">
                <div class="field">
                  <label class="label">Contact Person</label>
                  <div class="control has-icons-left">
                    <input v-model="booking.contactName" class="input" type="text" placeholder="Full name">
                    <span class="icon is-small is-left">
                      <i class="fas fa-user"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div class="column is-6">
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control has-icons-left">
                    <input v-model="booking.email" class="input" type="email" placeholder="Email address">
                    <span class="icon is-small is-left">
                      <i class="fas fa-envelope"></i>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Phone & Date -->
              <div class="column is-6">
                <div class="field">
                  <label class="label">Phone</label>
                  <div class="control has-icons-left">
                    <input v-model="booking.phone" class="input" type="tel" placeholder="Phone number">
                    <span class="icon is-small is-left">
                      <i class="fas fa-phone"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div class="column is-6">
                <div class="field">
                  <label class="label">Preferred Date</label>
                  <div class="control">
                    <input v-model="booking.date" class="input" type="date">
                  </div>
                </div>
              </div>

              <!-- Package Selection -->
              <div class="column is-12">
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
              </div>

              <!-- Additional Requirements -->
              <div class="column is-12">
                <div class="field">
                  <label class="label">Additional Requirements</label>
                  <div class="control">
                    <textarea v-model="booking.requirements" class="textarea" placeholder="Any special requirements or preferences?" rows="4"></textarea>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="column is-12">
                <div class="field">
                  <div class="control">
                    <button @click="submitBooking" class="button is-primary is-large is-fullwidth">
                      Submit Booking Request
                    </button>
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
.booking-form {
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.field {
  margin-bottom: 1.5rem;
}

.input, .select select, .textarea {
  border-radius: 4px;
  box-shadow: none;
  border: 1px solid #dbdbdb;
}

.input:focus, .select select:focus, .textarea:focus {
  border-color: #485fc7;
  box-shadow: 0 0 0 0.125em rgba(72, 95, 199, 0.25);
}

.label {
  color: #363636;
  font-weight: 500;
}

.button.is-primary {
  height: 3rem;
  font-weight: 500;
}

.icon.is-small {
  color: #7a7a7a;
}

@media screen and (max-width: 768px) {
  .booking-form {
    padding: 1.5rem;
  }
}
</style>