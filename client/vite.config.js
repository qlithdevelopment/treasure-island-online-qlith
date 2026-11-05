import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/storage': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
