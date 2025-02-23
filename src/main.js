import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS
AOS.init({
  duration: 500,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

const app = createApp(App)
app.use(router)
app.mount('#app')