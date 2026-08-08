import { getCollection } from "astro:content"
import { compareDesc, isSameYear } from "date-fns"

export async function getImages() {
  const sortedImages = (await getCollection("images")).sort((left, right) =>
    compareDesc(left.data.exif.date, right.data.exif.date),
  )

  return sortedImages.map((image, index) => ({
    ...image,
    isNewYear:
      index === 0 ||
      !isSameYear(sortedImages[index - 1].data.exif.date, image.data.exif.date),
  }))
}

export type Photo = Awaited<ReturnType<typeof getImages>>[0]
