import cssnano from "cssnano"
import postcssCustomMedia from "postcss-custom-media"
import postcssPresetEnv from "postcss-preset-env"

export default {
  plugins: [
    postcssCustomMedia(),
    postcssPresetEnv({ stage: 1 }),
    cssnano({
      preset: "default",
    }),
  ],
}
