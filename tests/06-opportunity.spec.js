const { test, expect } = require('@playwright/test');
const { POManager } = require('../pages/POManager');
const { usercredentials } = require('../test-data/opportunityData');
const { credentials } = require('../test-data/loginData');
let page,poManager,userLandingPage,OpportunityPage;


test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'storageState.json' });
  page = await context.newPage();
  poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);
  await expect(page).toHaveURL(/dashboard/);
  userLandingPage = poManager.getLandingPage();
  OpportunityPage = poManager.getOpportunityPage();
});