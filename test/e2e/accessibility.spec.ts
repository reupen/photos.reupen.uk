import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

import { PAGES } from "./constants.ts"

PAGES.forEach(({ path }) => {
  test.describe(path, () => {
    test("passes accessibility checks", async ({ page }) => {
      await page.goto(path)

      const axeResults = await new AxeBuilder({ page }).analyze() // 4

      expect(axeResults.violations).toEqual([])
    })
  })
})
