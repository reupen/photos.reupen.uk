import { expect, test } from "@playwright/test"

test.describe("/", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("can navigate to the next page", async ({ baseURL, page }) => {
    await page.getByText("Next").click()

    await expect(page).toHaveTitle("Page 2 – Reupen’s photos")
    expect(page.url()).toBe(`${baseURL}/2/`)
  })

  test("can navigate to an image", async ({ baseURL, page }) => {
    await page
      .getByRole("img", { name: "Sydney Opera House at night, Australia" })
      .click()

    await expect(page).toHaveTitle(
      "Sydney Opera House at night, Australia – Reupen’s photos",
    )
    expect(page.url()).toBe(
      `${baseURL}/image/sydney-opera-house-at-night-australia/`,
    )
  })
})

test.describe("/2/", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/2/")
  })

  test("can navigate to the previous page", async ({ baseURL, page }) => {
    await page.getByText("Previous").click()

    await expect(page).toHaveTitle("Reupen’s photos")
    expect(page.url()).toBe(`${baseURL}/`)
  })
})
