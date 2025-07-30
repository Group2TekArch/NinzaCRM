import { CreateUserPage } from "../pages/CreateUserPage";
import { LoginPage } from '../pages/LoginPage';
import { UserLandingPage } from'../pages/UserLandingPage'; 
import { AddProdPage } from'../pages/AddProdPage';
import { ContactPage } from'../pages/ContactPage';
import { LeadPage } from'../pages/LeadPage';
import {CampaignPage} from'../pages/CampaignPage';


export class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.userLandingPage = new UserLandingPage(page);
        this.createUserPage = new CreateUserPage(page);
        this.addProdPage = new AddProdPage(page);

        this.contactPage = new ContactPage(page);
        this.leadPage = new LeadPage(page);

        this.campaignPage =new CampaignPage(page);

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


    getCampaignPage(){
        return this.campaignPage;

    }
}



//module.exports={POManager};