import { defineCollection, z } from "astro:content"
import { ExifDateTime, exiftool } from "exiftool-vendored"
import { join } from "node:path"

const imageCollection = defineCollection({
  schema: ({ image }) =>
    z.preprocess(
      (val) => {
        if (!val || typeof val !== "object") return val

        return {
          ...val,
          exif: "src" in val ? val.src : null,
        }
      },
      z.object({
        title: z.string(),
        exif: z.string().transform(async (val) => {
          const exif = await exiftool.read(join("src/content/images", val))
          return {
            cameraModel: exif.Model,
            date:
              exif.DateTimeOriginal instanceof ExifDateTime
                ? exif.DateTimeOriginal.toDate()
                : null,
            exposureTime: exif.ExposureTime,
            lensModel: exif.LensModel,
            iso: exif.ISO,
            fNumber: exif.FNumber,
            focalLength: exif.FocalLength,
          }
        }),
        src: image(),
      }),
    ),
})

export const collections = {
  images: imageCollection,
}
