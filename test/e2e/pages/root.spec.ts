import { expect, test } from "@playwright/test"

test.describe("/", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
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
