import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 自动配置ElMessage相关组件的样式
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
import vue from '@vitejs/plugin-vue'
// 进行 gzip 压缩
import compression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name: string) => {
            return `element-plus/theme-chalk/${name}.css`
          }
        }
      ]
    }),
    compression({
      algorithm: 'gzip', // 压缩算法，可选['gzip'，'brotliCompress'，'deflate'，'deflateRaw']
      threshold: 10240 // 如果体积大于10kb阈值，则进行压缩，参数单位为b
    })
  ],
  resolve: {
    alias: {
      // 这是打包时要用的路径别名转换
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
