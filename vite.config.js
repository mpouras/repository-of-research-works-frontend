import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:8000",
        changeOrigin: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          rewrite: (path) => path.replace(/^\/api/, "/api")
        },
      },
    },
  },
});
