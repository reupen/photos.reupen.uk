import { defineConfig } from "astro/config"
import compress from "astro-compress"

export default defineConfig({
  scopedStyleStrategy: "class",
  integrations: [
    compress({
      css: false,
      html: true,
      img: false,
      js: false,
      svg: true,
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
