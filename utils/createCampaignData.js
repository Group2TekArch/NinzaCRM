
const validData =[
    {
        "CampaignName" :" NinzaCampaign1",
        "CampaignStatus" : "Active",
        "TargetSize" : "1000",
        "TargetAudience" : "General Public",
        "Description" : "This is a test campaign for Ninza CRM"
    },

     {
        "CampaignName" :" NinzaCampaign2",
        "CampaignStatus" : "Planned",
        "TargetSize" : "2000",
        "TargetAudience" : "Retail Customers",
        "Description" : "Promotion campaign for summer products."
    }

];

const negativeData = [
  {
    CampaignName: "",
    CampaignStatus: "Active",
    TargetSize: "1000",
    CampaignAudience: "General",
    Description: "Test 1",
    expectMissingField: "CampaignName"
  },
  {
    CampaignName: "July Sale",
    CampaignStatus: "Active",
    TargetSize: "",
    CampaignAudience: "All",
    Description: "Test 2",
    expectMissingField: "TargetSize"
  }
];

const campaign = 
  {
    CampaignName: "AI Campaign "+ Math.floor(Math.random()*1000),
    CampaignStatus: "Active",
    TargetSize: "1000",
    CampaignAudience: "General",
    Description: "Auto-generated campaign test",
    
  }
;

const negativeTargetValue = 
  {
    CampaignName: "AI Test Campaign "+ Math.floor(Math.random()*1000),
    CampaignStatus: "Active",
    TargetSize: "-100" , //nagative value for testing
    CampaignAudience: "General",
    Description: "Passing Negative Target Value",
  }
;

module.exports = {
        validData,
        negativeData,
        campaign,
        negativeTargetValue
        
      };

