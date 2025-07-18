const { test, expect } = require('@playwright/test');
const { validData, invalidData, invalidCategoryData, invalidVendorData } = require('../utils/addProductsData');
const { credentials } = require('../utils/loginData');
const { POManager } = require('../pages/POManager');
let page,poManager,userLandingPage,addProdPage;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'storageState.json' });
  page = await context.newPage();
  poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);
  await expect(page).toHaveURL(/dashboard/);
  userLandingPage = poManager.getLandingPage();
  const isAdminConsoleVisible = await userLandingPage.isAdminConsoleVisible();
  expect(isAdminConsoleVisible).toBe(true);
  addProdPage = poManager.getAddProductsPage();
  
});

for (const product of validData) {
  test(`Create product successfully: ${JSON.stringify(product)}`, async () => {
    await userLandingPage.clickAddProductsButton();
    await expect(page).toHaveURL(/create-product/);
    const randomNumber = Math.floor(Math.random() * 2000) + 1;
    const randomProductName = `NinzaProdQA4_${randomNumber}`;

    await addProdPage.fillAllFields(
        randomProductName,
        product.quantity,
        product.price,
        product.category,
        product.vendor
    );

    await addProdPage.clickAddButton();
    await addProdPage.verifyMessage(product.productName);
  });
}

for (const product of invalidData) {
  test(`Fail to create product (invalid): ${JSON.stringify(product)}`, async () => {
    await userLandingPage.clickAddProductsButton();
    await expect(page).toHaveURL(/create-product/);

    await addProdPage.fillAllFields(
        product.productName,
        product.quantity,
        product.price,
        product.category,
        product.vendor
    );

    await addProdPage.clickAddButton();
    await page.waitForTimeout(2500);
    await addProdPage.verifyFailureMessage(product.snapshot);
  });
}

for(const product of invalidCategoryData) {
    test(`Fail to create product (invalid category): ${JSON.stringify(product)}`, async () => {
    await userLandingPage.clickAddProductsButton();
    await expect(page).toHaveURL(/create-product/);

    await addProdPage.fillAllFieldsExpectCategory(
        product.productName,
        product.quantity,
        product.price,
        product.vendor
    );

    await addProdPage.clickAddButton();
    await page.waitForTimeout(2500);
    await addProdPage.verifyFailureMessage(product.snapshot);
  });
}

for (const product of invalidVendorData) {
    test(`Fail to create product (invalid vendor): ${JSON.stringify(product)}`, async () => {
        await userLandingPage.clickAddProductsButton();
        await expect(page).toHaveURL(/create-product/);
    
        await addProdPage.fillAllFieldsExpectVendor(
            product.productName,
            product.quantity,
            product.price,
            product.category
        );
    
        await addProdPage.clickAddButton();
        await page.waitForTimeout(2500);
        await addProdPage.verifyFailureMessage(product.snapshot);
      });
    }