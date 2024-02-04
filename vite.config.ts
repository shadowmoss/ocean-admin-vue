import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite';
import {resolve} from 'path';
import vueJSX from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJSX(),
    ElementPlus({})
  ],
  resolve:{
    alias:{
      '@':resolve(__dirname,'src')
    }
  },
  server:{
    port:8960,
    host:true
  }
})
