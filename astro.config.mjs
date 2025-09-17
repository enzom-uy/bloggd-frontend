// @ts-check
import { defineConfig } from "astro/config"

import react from "@astrojs/react"

import tailwindcss from "@tailwindcss/vite"

import netlify from "@astrojs/netlify";

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

  adapter: netlify(),
})