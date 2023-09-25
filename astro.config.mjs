import { defineConfig } from "astro/config"
import compress from "astro-compress"

export default defineConfig({
  scopedStyleStrategy: "class",
  site: "https://photos.reupen.uk",
  image: {
    service: {
      entrypoint: "./src/utils/imageService",
    },
  },
  integrations: [
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
