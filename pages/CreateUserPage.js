class CreateUserPage {
  constructor(page) {
    this.page = page;
    this.createUserHeader = page.locator("//h3");
    this.fullName = page.locator('[name="empName"]');
    this.userName = page.locator('[name="username"]');
    this.password = page.locator('[name="password"]');
    this.mobile = page.locator('[name="mobileNo"]');
    this.email = page.locator('[name="email"]');
    this.dob = page.locator("//input[@name='dob']");
    this.createUserButton = page.locator("//button[text()='Create User']");
    this.MobileHeader = page.locator("//label[text()='Mobile']/span");
    this.userNameHeader = page.locator("//label[text()='UserName']/span");
    this.passwordHeader = page.locator("//label[text()='Password']/span");
    this.emailHeader = page.locator("//label[text()='Email']/span");
    this.tooltipMessage = page.locator("//div[@role='alert']");
  }

  async isCreateUserPageVisible() {
    return await this.createUserHeader.isVisible();
  }

  async clickCreateUserButton() {
    await this.createUserButton.click();
  }

  async fillMandatoryFields(fullname, username, pwd, mobileNo, emailID) {
    // Wait for the form to be visible before filling
    await this.fullName.waitFor({ state: 'visible' });
    await this.fullName.fill(fullname);
    await this.userName.fill(username);
    await this.password.fill(pwd);
    await this.mobile.fill(mobileNo);
    await this.email.fill(emailID);
  }

  async fillNonMandatoryFields(date) {
    await this.dob.fill(date);
  }

  async verifyMessage(username) {
    // Wait for the tooltip to appear
    await this.tooltipMessage.waitFor({ state: 'visible' });
    const messageText = await this.tooltipMessage.textContent();
    if (messageText && messageText.includes(`Username ${username} Successfully Added`)) {
      console.log('User is created successfully');
    } else {
      console.log('User is not created successfully');
    }

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


      async fillNonMandatoryFields(date){
        await this.dob.fill(date);
      }

      async verifyMessage(username){
        const messageText = await this.tooltipMessage.textContent();
        console.log(messageText);
        if (messageText.includes('Username ${username} Successfully Added')) {
            console.log('User is created successfully');
        } else {
            console.log('User is not created successfully');
        }
      }
}


module.exports = {CreateUserPage};

  




