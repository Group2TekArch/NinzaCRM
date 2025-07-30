import { chromium, expect } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({
    channel: 'chrome', // Uses installed Chrome browser
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('http://49.249.28.218:8098');
  await page.fill('#username', 'rmgyantra');
  await page.fill('#inputPassword', '');
  await page.click("//button[text()='Sign In']");
  await expect(page).toHaveURL(/dashboard/); 
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
})();