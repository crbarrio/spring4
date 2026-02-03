import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/assets/demos/spring4/',
  plugins: [
    tailwindcss(),
  ],
})