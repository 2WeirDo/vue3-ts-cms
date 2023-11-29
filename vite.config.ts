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

import { visualizer } from 'rollup-plugin-visualizer'

// 配置 CDN
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true, // 在默认用户代理中打开生成的文件
      gzipSize: true, // 收集 gzip 大小并将其显示
      brotliSize: true, // 收集 brotli 大小并将其显示
      filename: 'stats.html' // 分析图生成的文件名
    }),
    importToCDN({
      prodUrl: 'https://unpkg.com/{name}@{path}',
      modules: [
        autoComplete('vue'), // 可以自动加速的
        autoComplete('axios'),
        {
          name: 'element-plus',
          var: 'ElementPlus',
          path: '2.3.9',
          css: '2.3.9/dist/index.css'
        },
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: '4.2.4'
        },
        {
          name: 'pinia',
          var: 'Pinia',
          path: '2.1.4'
        }
      ]
    }),
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
