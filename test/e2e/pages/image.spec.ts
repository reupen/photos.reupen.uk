import { expect, test } from "@playwright/test"

test.describe("/empire-state-building-new-york-city/", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/image/empire-state-building-new-york-city/")
  })

  test("sets the page meta description tag", async ({ page }) => {
    const metaDescription = page.locator("meta[name=description]")
    await expect(metaDescription).toHaveAttribute(
      "content",
      "Another photo taken in a rush (it was very crowded at the Top of the Rock " +
        "observation deck where I took the photo, and I had an aching leg).",
    )
  })

  test("can navigate to the previous image by link", async ({
    baseURL,
    page,
  }) => {
    await page.getByRole("link", { name: "Previous image" }).click()

    await expect(page).toHaveTitle("Almost full moon – Reupen’s photos")
    expect(page.url()).toBe(`${baseURL}/image/almost-full-moon/`)
  })

  test("can navigate to the previous image by left arrow", async ({
    baseURL,
    page,
  }) => {
    await page.keyboard.press("ArrowLeft")

    await expect(page).toHaveTitle("Almost full moon – Reupen’s photos")
    expect(page.url()).toBe(`${baseURL}/image/almost-full-moon/`)
  })

  test("can navigate to the next image by link", async ({ baseURL, page }) => {
    await page.getByRole("link", { name: "Next image" }).click()

    await expect(page).toHaveTitle(
      "Skyscrapers in front of Central Park, New York City – Reupen’s photos",
    )
    expect(page.url()).toBe(`${baseURL}/image/new-york-city-skyscrapers/`)
  })

  test("can navigate to the next image by right arrow", async ({
    baseURL,
    page,
  }) => {
    await page.keyboard.press("ArrowRight")

    await expect(page).toHaveTitle(
      "Skyscrapers in front of Central Park, New York City – Reupen’s photos",
    )
    expect(page.url()).toBe(`${baseURL}/image/new-york-city-skyscrapers/`)
  })

  test("can navigate to the index page", async ({ baseURL, page }) => {
    await page.getByRole("link", { name: "Reupen’s photos" }).click()

    await expect(page).toHaveTitle("Page 2 – Reupen’s photos")
    expect(page.url()).toBe(`${baseURL}/2/#empire-state-building-new-york-city`)
  })
})
