import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path" // Linha Adicionada

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  // Linhas Adicionadas
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
