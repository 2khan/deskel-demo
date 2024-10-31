import { resolve } from 'path'
import { defineConfig } from 'vite'

// Plugins
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
