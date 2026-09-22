import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Relative asset paths support static hosting under a repository subdirectory.
  base: "./",
  plugins: [react(), tailwindcss()],
});
