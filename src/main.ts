import './css/index.scss'
import 'vue-skeletor/dist/vue-skeletor.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import httpBoot from './boot/http.boot'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(httpBoot)
app.use(router)

app.mount('#app')
