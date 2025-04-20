import { spawn } from "node:child_process"

import type { LocalImageService } from "astro"
import { baseService } from "astro/assets"
import sharp from "sharp"

type LocalImageTransform = Parameters<LocalImageService["transform"]>[1]

async function hdrTranscode(
  inputBuffer: Uint8Array,
  transform: LocalImageTransform,
): Promise<Buffer> {
  const metadata = await sharp(inputBuffer).metadata()

  if (!metadata.width) {
    throw new Error("Failed to determine image width")
  }

  const scaleFactor = transform.width / metadata.width

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []

    const vips = spawn("vips", [
      "resize",
      "stdin",
      `.avif[Q=${parseInt(transform.quality)},bitdepth=12]`,
      `${scaleFactor}`,
    ])

    vips.stdout?.on("data", (chunk: Buffer) => {
      chunks.push(chunk)
    })

    vips.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Process exited with code ${code}`))
        return
      }

      if (chunks.length === 0) {
        reject(new Error("No data received from vips"))
        return
      }

      resolve(Buffer.concat(chunks))
    })

    vips.on("error", (err) => {
      reject(err)
    })

    vips.stdin?.write(inputBuffer)
    vips.stdin?.end()
  })
}

const service: LocalImageService = {
  getHTMLAttributes: baseService.getHTMLAttributes,
  getURL: baseService.getURL,
  parseURL: baseService.parseURL,
  validateOptions: baseService.validateOptions,
  async transform(inputBuffer, transform) {
    if (transform.isHDR) {
      const data = await hdrTranscode(inputBuffer, transform)

      return {
        data,
        format: "avif",
      }
    }

    const injectedOptions =
      transform.format === "webp"
        ? { effort: 6, preset: "photo" }
        : transform.format === "avif"
          ? { effort: 5, bitdepth: 12 }
          : {}

    const { data, info } = await sharp(inputBuffer)
      .withMetadata()
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
