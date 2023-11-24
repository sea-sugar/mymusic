import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
     proxy:{
        '/api':{
            target:"https://api.trtst.com", //跨域地址
            changeOrigin:true, //支持跨域
            rewrite:(path) => path.replace(/^\/api/, "")//重写路径,替换/api
        }
     }
  }
})
