import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api/tmdb': {
        target: 'https://api.tmdb.org/3',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/tmdb/, '')
      }
    }
  }
})
