// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',  
   timeout: 30_000,
  expect:
  {
    timeout: 5_000
  },                   // Test files location
  fullyParallel: false,                    // Run tests in parallel
  //forbidOnly: !!process.env.CI,           // Prevent accidental .only in CI
  //retries: 2,                          // Retry failed tests in CI
  workers: 1,                        // Limit workers on CI
  reporter: 'html',                       // HTML report generation

  use: {
    baseURL: 'http://49.249.28.218:8098',       
    headless: false,                       // Run in headless mode
    screenshot: 'only-on-failure',        // Capture screenshot on failure
    video: 'retain-on-failure',           // Record video for failed tests
    trace: 'on-first-retry',              // Enable trace viewer for debugging
    snapshotSuffix: '',
    //storageState: 'storageState.json',
  },

  projects: [
    {
      name: 'chrome',
    use: {
      ...devices['Desktop Chrome'],
      channel: 'chrome', 
    },
    },
  ]
});