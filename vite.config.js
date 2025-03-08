import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname),
  server: {
    port: 3000,
    proxy: process.env.NODE_ENV === "production" ? {} : {
      "/api": "http://localhost:5000", // Redirect API calls to Express (port 5000)
    },
    host: true
  },
  build: {
    outDir: "dist", // Output for production build
  },
});
