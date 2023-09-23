import type { LocalImageService } from "astro"
import { baseService } from "astro/assets"
import sharp from "sharp"

const service: LocalImageService = {
  validateOptions: baseService.validateOptions,
  getURL: baseService.getURL,
  parseURL: baseService.parseURL,
  getHTMLAttributes: baseService.getHTMLAttributes,
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
