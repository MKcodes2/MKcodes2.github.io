import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// User site (MKcodes2.github.io) is served from the domain root, so base is '/'.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
})
