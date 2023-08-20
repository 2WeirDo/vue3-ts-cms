import type { App } from 'vue'
// 图标的全局导入
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 像这种app的类型如何查看就鼠标移到app上就行了(在main.ts中)或者点进源码看
function registerIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

export default registerIcons
