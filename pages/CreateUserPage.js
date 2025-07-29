const { expect } = require('@playwright/test');

class CreateUserPage{
    constructor(page){
        this.page = page;
        this.createUserHeader = page.locator("//h3");
        this.fullName = page.locator('[name="empName"]');
        this.userName = page.locator('[name="username"]');
        this.password=page.locator('[name="password"]');
        this.mobile=page.locator('[name="mobileNo"]');
        this.email=page.locator('[name="email"]');
        this.dob=page.locator("//input[@type='date']");
        this.createUserButton=page.locator( "//button[text()='Create User']");
        this.MobileHeader=page.locator("//label[text()='Mobile']/span");
        this.userNameHeader=page.locator("//label[text()='UserName']/span");
        this.passwordHeader=page.locator("//label[text()='Password']/span");
        this.emailHeader=page.locator("//label[text()='Email']/span");  
        this.tooltipMessage=page.locator("//div[@role='alert']");
        this.errorMessage=page.locator("//div[@class='error-message']");
    }

    async isCreateUserPageVisible() {
        return await this.createUserHeader.isVisible();
      }

      async clickCreateUserButton(){
        await this.createUserButton.click();
      }

      async fillMandatoryFields(fullname,username,pwd,mobileNo,emailID){
        await this.fullName.fill(fullname);
        await this.userName.fill(username);
        await this.password.fill(pwd);
        await this.mobile.fill(mobileNo);
        await this.email.fill(emailID);
      }


      async fillNonMandatoryFields(date=''){
        //await this.dob.fill(date);
        if(date === 'today'){
          await this.useTodayDate();
        }else{
        await this.useDatePicker();
      }
      }

       async verifyMessage(fullname){
              this.tooltipMessage.waitFor({ state: 'visible' });
              //const messageText = await this.tooltipMessage.textContent();
              const messageText = await this.tooltipMessage.textContent();
              console.log(messageText);
              // Use expect to assert the success message is present
              expect(messageText).toEqual(`User ${fullname.trim()} Successfully Added`);
            }

            async verifyUserAlreadyExists(username){
              this.tooltipMessage.waitFor({ state: 'visible' });
              //const messageText = await this.tooltipMessage.textContent();
              const messageText = await this.tooltipMessage.textContent();
              console.log(messageText);
              // Use expect to assert the success message is present
              expect(messageText).toEqual(`username: ${username.trim()} already exists`);
            }

      async verifyInvalidEmailError(errorMsg){
          const messageText = await this.errorMessage.textContent();
          console.log(messageText);
          expect(messageText).toEqual(errorMsg);
      }

      async useTodayDate(){
        const today = new Date();
        const dobString = today.toISOString().split('T')[0];
        await this.dob.fill(dobString);
        console.log("Date picker used successfully");
      }

      async useDatePicker() {
        //await this.datePickerIcon.click(); // Open the date picker
        const today = new Date();
        const pastDate = new Date(today.setFullYear(today.getFullYear() - 20));
        const dobString = pastDate.toISOString().split('T')[0];
        await this.dob.fill(dobString);
        console.log("Date picker used successfully");

        // Verify it's filled
        const selectedDate = await this.dob.inputValue();
        expect(selectedDate).toBe(dobString);
        console.log(`Date selected: ${selectedDate}`);
    }
    async verifyFailMessage(errorMsg){
      const messageText = await this.tooltipMessage.textContent();
      console.log(messageText);
      expect(messageText).toContain(errorMsg);
    }

    async verifyInvalidDataTooltipMessage(locator,expMsg){
      const actualMsg = await locator.evaluate(el => el.validationMessage);
      console.log('Validation Message:', actualMsg);
      expect(actualMsg.trim()).toEqual(expMsg);
    }

    async verifyFieldValue(locator,expvalue){
      const actvalue = await locator.evaluate(el => el.value);
      expect(actvalue).toEqual(expvalue);
    }
}


module.exports = {CreateUserPage};