const { expect } = require('@playwright/test');
class ContactPage{

    }

    async fillmandatoryFields(organization, title, department, officePhone, contactName, mobile, email) {
        await this.organizaton.fill(organization);
        await this.title.fill(title);
        await this.contactname.fill(contactName);
        await this.mobile.fill(mobile);
        await this.campaign.click();
        const campaignOption = this.page.locator("//tbody/tr[2]/td[7]/button[1]");
        await campaignOption.click();
    }
    
    async fillnonMandatoryFields(department, officePhone, email) {
        await this.department.fill(department);
        await this.officephone.fill(officePhone);
        await this.email.fill(email);
    }
    
    async clickAddButton() {
        await this.createContactButton.click();
    }
}
module .exports = { ContactPage };