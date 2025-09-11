// @ts-check
import { defineConfig } from "astro/config"

import react from "@astrojs/react"

import tailwindcss from "@tailwindcss/vite"

console.log(process.env.DATABASE_URL)

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    define: {
      global: "globalThis",
    },
    optimizeDeps: {
      include: ["better-auth/react", "better-auth/client"],
    },
  },
})
