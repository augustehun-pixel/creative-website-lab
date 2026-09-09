import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite's dev server rejects requests whose Host header it doesn't
  // recognize (a security guard against DNS-rebinding attacks). A
  // Codespaces "forwarded port" preview URL arrives with a Host like
  // `<codespace>-5173.app.github.dev`, which isn't localhost, so without
  // this the dev server returns a 403 "Blocked request" page instead of
  // the app — the app was never broken, the request never reached it.
  server: {
    allowedHosts: ['.app.github.dev'],
  },
  preview: {
    allowedHosts: ['.app.github.dev'],
  },
})
