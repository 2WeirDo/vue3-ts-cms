import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      // 这是打包时要用的路径别名转换
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
