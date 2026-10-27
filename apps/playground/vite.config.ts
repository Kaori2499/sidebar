import path from "path"
import { fileURLToPath } from "url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const reactPkg = path.resolve(__dirname, "../../packages/react")

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Prefer package source in the monorepo so Tailwind + HMR see class strings
      "@component-template/react/styles.css": path.join(reactPkg, "src/styles.css"),
      "@component-template/react": path.join(reactPkg, "src/index.ts"),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 5174,
    strictPort: true,
  },
})
