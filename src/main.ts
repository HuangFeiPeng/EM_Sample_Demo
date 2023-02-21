import { createApp } from 'vue';
import App from './App.vue';
/* pinia */
import { createPinia } from 'pinia';
/* router */
import router from './router';
/* element plus */
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './styles/reset.css';
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(ElementPlus);
// mount
app.mount('#app');
