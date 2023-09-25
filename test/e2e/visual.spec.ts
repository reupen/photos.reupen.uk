import { expect, test } from "@playwright/test"
import { PAGES } from "./constants.ts"

PAGES.forEach(({ path, takeViewportScreenshot }) => {
  test.describe(path, () => {
    test("matches the saved screenshot", async ({ page }) => {
      await page.goto(path)
      await expect(page).toHaveScreenshot(
        [path.replaceAll(/(^\/|\/$)/g, ""), "screenshot.png"],
        {
          fullPage: !takeViewportScreenshot,
          timeout: process.env.CI ? 40_000 : 10_000,
        },
      )
    })
  })
})
