import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: true,
    allowedHosts: ["zeribytecare.com"],
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
