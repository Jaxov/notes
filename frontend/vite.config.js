import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // отключаем source maps на проде
    minify: "esbuild", // используем Terser для минификации
    terserOptions: {
      compress: {
        drop_console: true, // убираем все console.log
      },
      mangle: true, // переименовываем переменные/функции
    },
  },
})
