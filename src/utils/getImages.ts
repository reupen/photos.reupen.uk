import { getCollection } from "astro:content"
import { compareDesc, isSameMonth } from "date-fns"

export async function getImages() {
  const sortedImages = (await getCollection("images")).sort((left, right) =>
    compareDesc(left.data.exif.date, right.data.exif.date),
  )

  return sortedImages.map((image, index) => ({
    ...image,
    isNewMonth:
      index === 0 ||
      !isSameMonth(
        sortedImages[index - 1].data.exif.date,
        image.data.exif.date,
      ),
  }))
}
