const { CreateUserPage } = require("../pages/CreateUserPage");
const { LoginPage } = require('../pages/LoginPage');
const { UserLandingPage } = require('../pages/UserLandingPage'); 
const { AddProdPage } = require('../pages/AddProdPage');

class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.userLandingPage = new UserLandingPage(page);
        this.createUserPage = new CreateUserPage(page);
        this.addProdPage = new AddProdPage(page);
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
}

module.exports={POManager};