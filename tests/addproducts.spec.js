const { test, expect } = require('@playwright/test');
const { validData, invalidData, invalidCategoryData, invalidVendorData, duplicateProductData } = require('../test-data/addProductsData');
const { credentials } = require('../test-data/loginData');
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
    const randomProductName = `NinzaProdQA4${randomNumber}`;

    await addProdPage.fillAllFields(
        randomProductName,
        product.quantity,
        product.price,
        product.category,
        product.vendor
    );

    await addProdPage.clickAddButton();
    await addProdPage.verifyMessage(product.productName);
    await page.waitForTimeout(6000);
    await addProdPage.searchProduct(randomProductName);
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
    const locator = addProdPage[product.errorField];
    await addProdPage.verifyInvalidDataTooltipMessage(locator,product.errormsg);
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
    const locator = addProdPage[product.errorField];
    await addProdPage.verifyInvalidDataTooltipMessage(locator,product.errormsg);
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
        const locator = addProdPage[product.errorField];
        await addProdPage.verifyInvalidDataTooltipMessage(locator,product.errormsg);
        await addProdPage.verifyFailureMessage(product.snapshot);
      });
    }

    test('Verify category dropdown values', async () => {
        await userLandingPage.clickAddProductsButton();
        await expect(page).toHaveURL(/create-product/);
        const actualValues = await addProdPage.getCategoryDropdownValues();
        const expectedValues = ['Electronics', 'Furniture', 'Electricals', 'Apparels','Others'];
        for (const value of expectedValues) {
          expect(actualValues).toContain(value);
        }
        await addProdPage.verifySelectedCategoryDropdownValue('Furniture');
    });

    test('Verify vendor dropdown values', async () => {
        await userLandingPage.clickAddProductsButton();
        await expect(page).toHaveURL(/create-product/);
        const actualValues = await addProdPage.getVendorDropdownValues();
        expect(actualValues.length).toBeGreaterThan(0);
        await addProdPage.verifySelectedVendorDropdownValue('VendorSmartFan - (Furnitures)');
    });

    test('Verify default Quantity value',async() =>{
        await userLandingPage.clickAddProductsButton();
        await expect(page).toHaveURL(/create-product/);
        await addProdPage.verifyDefaultQuantity();
    });

for (const product of duplicateProductData) {
    test('Failed to add product - duplicate product',async() =>{
    await userLandingPage.clickAddProductsButton();
    await expect(page).toHaveURL(/create-product/);
    const randomNumber = Math.floor(Math.random() * 2000) + 1;
    const randomProductName = `NinzaProdQA22${randomNumber}`;

    await addProdPage.fillAllFields(
        randomProductName,
        product.quantity,
        product.price,
        product.category,
        product.vendor
    );

    await addProdPage.clickAddButton();
    await addProdPage.verifyMessage(randomProductName);

    await userLandingPage.clickAddProductsButton();
    await expect(page).toHaveURL(/create-product/);

    await addProdPage.fillAllFields(
        randomProductName,
        product.quantity,
        product.price,
        product.category,
        product.vendor
    );

    await addProdPage.clickAddButton();
    await addProdPage.verifyFailMessage(randomProductName);


    });
}
