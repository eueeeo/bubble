import './bootstrap';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import AdSlot from './components/AdSlot.vue';
import '../css/style.css';

const app = createApp(App);
app.component('ad-slot', AdSlot);
app.use(router);
app.mount('#app');
