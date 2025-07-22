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
        this.searchOptionSelect=page.locator("//select[@class='form-control']");
        this.searchInput = page.getByPlaceholder("Search by product Name");
        this.searchTable = page.locator("//table[@class='table table-striped table-hover']/tbody/tr");
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
        console.log(messageText);
        // Use expect to assert the success message is present
        expect(messageText).toContain('Successfully Added');
      }

      async verifyFailMessage(){
        const messageText = await this.tooltipMessage.textContent();
        console.log(messageText);
        // Use expect to assert the success message is present
        expect(messageText).toContain('Product is Not Added');
      }

      async verifyFailureMessage(snapshot){
        //const screenshotPath = `landing${screenshotCounter++}.png`;
       // const timestamp = Date.now();
        //const screenshotPath = `landing_${timestamp}.png`;
        //const snapshotPath = `../tests/addproducts.spec.js-snapshots/${snapshot}`;
        expect(await this.page.screenshot()).toMatchSnapshot(snapshot);
      }

      async getCategoryDropdownValues() {
        const options = this.categoryDropdown.locator('option');
        const values = await options.allTextContents();
        return values;
      }

      async verifySelectedCategoryDropdownValue(value){
        await this.categoryDropdown.selectOption({ label: value });

        const selectedValue = await this.categoryDropdown.inputValue();
        const selectedOptionText = await this.categoryDropdown.locator(`option[value="${selectedValue}"]`).textContent();
        expect(selectedOptionText.trim()).toBe(value);
      }

      async getVendorDropdownValues(value){
        const options = this.vendorDropdown.locator('option');
        const values = await options.allTextContents();
        return values;
      }

      
      async verifySelectedVendorDropdownValue(value){
        await this.vendorDropdown.selectOption({ label: value });

        const selectedValue = await this.vendorDropdown.inputValue();
        const selectedOptionText = await this.vendorDropdown.locator(`option[value="${selectedValue}"]`).textContent();
        expect(selectedOptionText.trim()).toBe(value);
      }

      async verifyDefaultQuantity(){
        const defaultqty = await this.quantity.inputValue();
        expect(defaultqty.trim()).toBe('0');
      }

      async searchProduct(prodname){
        await this.searchOptionSelect.selectOption("productName");
        await this.searchInput.fill(prodname);
        const rcount = await this.searchTable.count();
        expect(rcount).toBe(1);
        const pname = await this.searchTable.locator('td:nth-child(2)').textContent();
        expect(pname.trim()).toEqual(prodname);
     }
    }

    module.exports = { AddProdPage };