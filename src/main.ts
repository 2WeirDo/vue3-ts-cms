import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// 要声明它们是一个组件

import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
