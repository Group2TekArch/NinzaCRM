const { CreateUserPage } = require("../pages/CreateUserPage");
const { LoginPage } = require('../pages/LoginPage');
const { UserLandingPage } = require('../pages/UserLandingPage'); 
const { AddProdPage } = require('../pages/AddProdPage');
const { ContactPage } = require('../pages/ContactPage');
const { LeadPage } = require('../pages/LeadPage');

class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.userLandingPage = new UserLandingPage(page);
        this.createUserPage = new CreateUserPage(page);
        this.addProdPage = new AddProdPage(page);
        this.contactPage = new ContactPage(page);
        this.leadPage = new LeadPage(page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getCreateUserPage(){
        return this.createUserPage;
    }

    getLandingPage(){
        return this.userLandingPage;
    }

    getAddProductsPage(){
        return this.addProdPage;
    }
    getContactPage(){
        return this.contactPage;
    }

    getLeadPage(){
        return this.leadPage;
    }
}

module.exports={POManager};