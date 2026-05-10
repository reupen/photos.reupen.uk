import sitemap from "@astrojs/sitemap"
import compress from "@playform/compress"
import purgecss from "astro-purgecss"
import { defineConfig } from "astro/config"

export default defineConfig({
  scopedStyleStrategy: "class",
  site:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4321"
      : "https://photos.reupen.uk",
  image: {
    service: {
      entrypoint: "./src/utils/imageService",
    },
  },
  integrations: [
    sitemap(),
    purgecss(),
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
