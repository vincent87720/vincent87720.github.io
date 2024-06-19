import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://katsuobushi87720.github.io',
    outDir: './docs',
    trailingSlash: "never",
    build: {
        assets: 'assets'
    },
    vite: {
        build: {
            cssCodeSplit: false,
        }
    }
});
