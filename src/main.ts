import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
// 要声明它们是一个组件

import router from './router'
import pinia from './stores'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(pinia)

app.mount('#app')
