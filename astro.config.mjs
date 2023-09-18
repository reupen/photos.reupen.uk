import { defineConfig } from "astro/config"
import compress from "astro-compress"

export default defineConfig({
  scopedStyleStrategy: "class",
  integrations: [
    compress({
      CSS: false,
      HTML: true,
      Image: false,
      JavaScript: false,
      SVG: true,
    }),
  ],
  // vite: {
  //   build: {
  //     rollupOptions: {
  //       output: {
  //         assetFileNames: `_assets/[hash]/[name][extname]`,
  //       },
  //     },
  //   },
  // },
  trailingSlash: "never",
})
