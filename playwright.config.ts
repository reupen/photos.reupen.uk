import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./test/e2e",
  timeout: process.env.CI ? 60_000 : 30_000,
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      threshold: 0.05,
    },
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  maxFailures: process.env.CI ? 10 : undefined,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    [process.env.CI ? "github" : "line"],
    ["html", { outputFolder: "./test/e2e/output/html/", open: "never" }],
  ],
  use: {
    actionTimeout: 0,
    baseURL: "http://localhost:4321",
    trace: process.env.PLAYWRIGHT_TRACE
      ? "retain-on-failure"
      : "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      grepInvert: /@mobile/,
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      grepInvert: /@mobile/,
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      grepInvert: /@mobile/,
      expect: {
        toHaveScreenshot: {
          maxDiffPixelRatio: 0.00025,
        },
      },
    },
    {
      name: "pixel-5",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "ipad-7",
      use: { ...devices["iPad (gen 7)"] },
      grepInvert: /@mobile/,
      expect: {
        toHaveScreenshot: {
          maxDiffPixelRatio: 0.00025,
        },
      },
    },
  ],

  outputDir: "test/e2e/output/artefacts/",
  snapshotPathTemplate:
    "{testDir}/__screenshots__/{testFilePath}/{arg}--{projectName}{ext}",

  webServer: {
    command: "npm run preview",
    port: 4321,
  },
})
