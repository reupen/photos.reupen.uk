const cssnano = require("cssnano")
const postcssPresetEnv = require("postcss-preset-env")
const postcssCustomMedia = require("postcss-custom-media");

module.exports = {
  plugins: [
    postcssCustomMedia(),
    postcssPresetEnv({ stage: 1 }),
    cssnano({
      preset: "default",
    }),
  ],
}
