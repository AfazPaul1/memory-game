import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return (
    {
      plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: [env.VITE_ALLOWED_HOST]
  }
    }
  )
})
