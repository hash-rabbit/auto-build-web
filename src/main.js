import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import axios from './request/axios'
import 'element-plus/dist/index.css'
import './assets/base.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.provide("axios",axios)
app.mount('#app')
