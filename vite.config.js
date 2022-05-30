import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, "src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/styles/index.scss";' // 此处为字符串加分号；，多个文件分号分割
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: '8899',
    proxy: { // 代理配置
      '/v1/api': {
        target: 'http://localhost:9200',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\v1\/api/, '')
      },
    },
  }
})
