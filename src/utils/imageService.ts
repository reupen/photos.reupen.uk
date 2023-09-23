import type { LocalImageService } from "astro"
import { baseService } from "astro/assets"
import sharp from "sharp"

const service: LocalImageService = {
  getHTMLAttributes: baseService.getHTMLAttributes,
  getURL: baseService.getURL,
  parseURL: baseService.parseURL,
  validateOptions: baseService.validateOptions,
  async transform(inputBuffer, transform) {
    const { data, info } = await sharp(inputBuffer)
      .withMetadata()
      .rotate()
      .resize({ width: transform.width })
      .toFormat(transform.format, {
        quality: transform.quality,
      })
      .toBuffer({ resolveWithObject: true })

    return {
      data,
      format: info.format,
    }
  },
}

export default service
