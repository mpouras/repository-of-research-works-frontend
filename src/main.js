import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'; 
import { setupMeta } from './utils/vue-meta';
import '@mdi/font/css/materialdesignicons.css';
import '@vuepic/vue-datepicker/dist/main.css';
import './assets/app.css'

const pinia = createPinia();
const app = createApp(App);

pinia.use(({store}) => {
    store.router = markRaw(router);
});

app.use(Vue3Toastify, {
    autoClose: 4000,
    position: "top-center",
    transition: "slide",
    closeButton: true,
    pauseOnHover: true
});

app.use(pinia);
app.use(router);
setupMeta();

app.mount('#app');