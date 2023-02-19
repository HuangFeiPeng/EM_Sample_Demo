import { createApp } from 'vue'
import App from './App.vue'
/* router */
import router from './router'
/* element plus */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/reset.css'
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
// mount
app.mount('#app')
