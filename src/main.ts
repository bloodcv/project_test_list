import { createApp } from 'vue'
import App from './App.vue'
import router from './router/route';
import './styles/style.css'

const app = createApp(App);

app.use(router).mount('#app');
