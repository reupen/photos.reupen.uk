import { expect, test } from "@playwright/test"

const PAGES = ["/", "/2", "/image/the-lobby-at-atlantis-the-palm-dubai"]

PAGES.forEach((path) => {
  test.describe(path, () => {
    test("matches the saved screenshot", async ({ page }) => {
      await page.goto(path)
      await expect(page).toHaveScreenshot(
        [path.replaceAll(/(^\/|\/$)/g, ""), "screenshot.png"],
        { fullPage: true, timeout: process.env.CI ? 30_000 : 10_000 },
      )
    })
  })
})
