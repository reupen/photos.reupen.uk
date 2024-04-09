import { defineConfig } from "astro/config"
import compress from "@playform/compress"
import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  scopedStyleStrategy: "class",
  site: "https://photos.reupen.uk",
  image: {
    service: {
      entrypoint: "./src/utils/imageService",
    },
  },
  integrations: [
    sitemap(),
    compress({
      CSS: false,
      HTML: false,
      Image: false,
      JavaScript: false,
      SVG: true,
    }),
  ],
  trailingSlash: "always",
})
