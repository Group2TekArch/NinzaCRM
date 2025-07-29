const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { UserLandingPage } = require('../pages/UserLandingPage'); 
const { CreateUserPage } = require("../pages/CreateUserPage");
const { credentials } = require('../test-data/loginData');

test('valid login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const userLandingPage = new UserLandingPage(page);
  const createUserPage = new CreateUserPage(page);
  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);
   
    await expect(page).toHaveURL(/dashboard/); 
   const isAdminConsoleVisible = await userLandingPage.isAdminConsoleVisible();
   expect(isAdminConsoleVisible).toBe(true);


   await userLandingPage.clickCreateUserLink();
   await expect(page).toHaveURL(/create-user/); 
   const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
   expect(isCreateUserPageVisible).toBe(true);
   await page.context().storageState({ path: 'auth.json' });
});