
const { expect } = require('@playwright/test');
let screenshotCounter = 1;

class AddProdPage{
    
    constructor(page){
        this.page = page;
        this.productName=page.locator("//input[@name='productName']");
        this.quantity=page.locator("//input[@name='quantity']");
        this.price=page.locator("//input[@name='price']");
        this.categoryDropdown=page.locator("//select[@name='productCategory']");
        this.vendorDropdown=page.locator("//select[@name='vendorId']");
        this.addButton=page.locator("//button[@type='submit']");
        this.tooltipMessage=page.locator("//div[@role='alert']");
    }

    async fillAllFields(prodName,qty,prc,category,vendor){
        await this.productName.fill(prodName);
        await this.quantity.fill(qty);
        await this.price.fill(prc);
        await this.categoryDropdown.selectOption({ label: category });
        await this.vendorDropdown.selectOption({label : vendor});
    }

    async fillAllFieldsExpectCategory(prodName,qty,prc,vendor){
        await this.productName.fill(prodName);
        await this.quantity.fill(qty);
        await this.price.fill(prc);
        await this.vendorDropdown.selectOption({label : vendor});
    }

    async fillAllFieldsExpectVendor(prodName,qty,prc,category){
        await this.productName.fill(prodName);
        await this.quantity.fill(qty);
        await this.price.fill(prc);
        await this.categoryDropdown.selectOption({ label: category });
    }

    async clickAddButton(){
        await this.addButton.click();
        // const tooltip = await this.addButton.getAttribute('title');
        // console.log(tooltip);
    }

    async verifyMessage(prodname){
        const messageText = await this.tooltipMessage.textContent();
        console.log(prodname);
        console.log(messageText);
        if (messageText.includes('Successfully Added')) {
            console.log('product is added successfully');
        } else {
            console.log('product is not added successfully');
        }
      }

      async verifyFailureMessage(snapshot){
        //const screenshotPath = `landing${screenshotCounter++}.png`;
       // const timestamp = Date.now();
        //const screenshotPath = `landing_${timestamp}.png`;
        //const snapshotPath = `../tests/addproducts.spec.js-snapshots/${snapshot}`;
        expect(await this.page.screenshot()).toMatchSnapshot(snapshot);
      }

    }

    module.exports = { AddProdPage };