import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"
import { ExifDateTime, exiftool } from "exiftool-vendored"
import { join } from "node:path"

const imageCollection = defineCollection({
  loader: glob({
    base: "./src/photos",
    pattern: "**/*.md",
  }),
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
        exif: z.string().transform(async (val, ctx) => {
          const exif = await exiftool.read(join("src/photos", val))

          if (!(exif.DateTimeOriginal instanceof ExifDateTime)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Missing date.`,
            })

            return z.NEVER
          }

          return {
            cameraModel: exif.Model,
            date: exif.DateTimeOriginal.toDate(),
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
