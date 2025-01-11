import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',  // Allow external traffic
    port: process.env.PORT || 3000,  // Use the environment port or fallback to 3000
  },
  plugins: [react()],
})
