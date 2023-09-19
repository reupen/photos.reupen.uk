import { getCollection } from "astro:content"

export async function getImages() {
  return (await getCollection("images")).sort(
    (left, right) =>
      (right.data.exif.date?.valueOf() ?? 0) -
      (left.data.exif.date?.valueOf() ?? 0),
  )
}
