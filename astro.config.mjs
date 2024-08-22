import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://vincent87720.github.io',
  outDir: './docs',
  trailingSlash: "ignore",
  build: {
    assets: 'assets'
  },
  vite: {
    build: {
      cssCodeSplit: false
    }
  },
  integrations: [sitemap()],
  serviceWorker: true,
});