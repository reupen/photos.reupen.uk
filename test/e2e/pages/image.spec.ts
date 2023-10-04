import { expect, test } from "@playwright/test"

test.describe("/empire-state-building-new-york-city/", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/image/empire-state-building-new-york-city/")
  })

  test("can navigate to the previous image by link", async ({
    baseURL,
    page,
  }) => {
    await page.getByText("Previous").click()

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
    await page.getByText("Next").click()

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
    await page.getByText("Return to photo list").click()

    await expect(page).toHaveTitle("Reupen’s photos")
    expect(page.url()).toBe(`${baseURL}/#empire-state-building-new-york-city`)
  })
})
