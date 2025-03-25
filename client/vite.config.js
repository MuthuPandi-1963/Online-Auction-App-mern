import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // define: {
  //   'import.meta.env.VITE_BACKEND_URL_LOCAL': JSON.stringify(process.env.VITE_BACKEND_URL_LOCAL),
  //   'import.meta.env.VITE_BACKEND_URL': JSON.stringify(process.env.VITE_BACKEND_URL),
  //   'import.meta.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  // },  
  plugins: [
    react(),
    tailwindcss()
  ],
})
