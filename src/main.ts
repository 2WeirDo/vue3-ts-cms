import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
// 要声明它们是一个组件

import router from './router'
import store from './stores'
import registerIcons from './global/register-icons'

// 针对ElMessage和ElLoading等组件引入样式
// import 'element-plus/theme-chalk/el-message.css'
// 但我们这里使用的是自动引入相关组件的样式, 在vite.config.ts中进行配置 (还要下载两个插件 vite-plugin-style-import 和 consola)



const app = createApp(App)
// 导入图标
app.use(registerIcons)
app.use(store)
app.use(router)
app.mount('#app')
