import cssnano from "cssnano"
import postcssPresetEnv from "postcss-preset-env"
import postcssCustomMedia from "postcss-custom-media"

export default {
  plugins: [
    postcssCustomMedia(),
    postcssPresetEnv({ stage: 1 }),
    cssnano({
      preset: "default",
    }),
  ],
}
