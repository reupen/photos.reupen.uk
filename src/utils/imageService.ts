import type { LocalImageService } from "astro"
import { baseService } from "astro/assets"
import queryString from "query-string"
import sharp from "sharp"

const service: LocalImageService = {
  getHTMLAttributes: baseService.getHTMLAttributes,
  validateOptions: baseService.validateOptions,
  propertiesToHash: [
    ...(baseService.propertiesToHash ?? []),
    "isHDR",
    "dropMetadata",
  ],
  async getURL(options, imageConfig, logger) {
    const url = await baseService.getURL(options, imageConfig, logger)

    if (!url) {
      return url
    }

    const { query, ...parsedRest } = queryString.parseUrl(url, {
      parseFragmentIdentifier: true,
    })

    if ((options.isHDR || options.dropMetadata) && query.href) {
      return queryString.stringifyUrl({
        ...parsedRest,
        query: {
          ...query,
          dm: options.dropMetadata && "1",
          hdr: options.isHDR && "1",
        },
      })
    }

    return url
  },
  parseURL(url, imageConfig, logger) {
    const transform = baseService.parseURL(url, imageConfig, logger)

    if (transform === undefined) return undefined

    return {
      ...transform,
      dropMetadata: url.searchParams.get("dm") === "1",
      isHDR: url.searchParams.get("hdr") === "1",
    }
  },
  async transform(inputBuffer, transform) {
    const injectedOptions =
      transform.format === "webp"
        ? { effort: 6, preset: "photo" }
        : transform.format === "avif"
          ? { effort: 5, bitdepth: 12 }
          : {}

    const { data, info } = await (() => {
      const initialInstance = sharp(inputBuffer)

      if (transform.dropMetadata) return initialInstance

      if (transform.isHDR) return initialInstance.keepMetadata()

      return initialInstance.withMetadata()
    })()
      .rotate()
      .resize({ width: transform.width })
      .toFormat(transform.format, {
        ...injectedOptions,
        quality: parseInt(transform.quality),
      })
      .toBuffer({ resolveWithObject: true })

    return {
      data,
      format: info.format,
    }
  },
}

export default service
