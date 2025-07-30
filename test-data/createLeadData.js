exports.leadDataAllFields = {
    leadName: 'grouptwo',
    company: 'tekarch',
    leadSource: 'web',
    industry:'IT',
    annualRevenue:'2500000',
    numberOfEmployees:'1000',

    phone: '1234567890',
    email: 'group2ninza@tekarch.com',
    secondaryEmail: 'group2ninza@gmail.com',
    leadStatus:'new',
    rating:'4',
    assignedTo:'team2',

    address: 'leadaddress',
    city: 'leadcity',
    country: 'usa',
    postalCode:'980234',
    website:'www.group2.com',
    description:'lead description'
  };

<<<<<<< HEAD
  exports.leadDataMandotoryFields = {
    leadName: '',
    company: 'tekarch',
=======
  exports.leadDataMandatoryFields = {
    leadName: 'Regina',
    company: 'BCBS',
>>>>>>> 3591c55ff0faf13451edf467cc1155ae87ec12dc
    leadSource: 'web',
    industry:'IT',
    phone: '1234567890',
    leadStatus:'new',
<<<<<<< HEAD
    campaign:'KK',
    decsription:'lead description'
  
  };

  exports.leadDataMandotoryFields = {
    leadName: 'grouptwo',
    company: 'tekarch',
    leadSource: '',
    industry:'IT',
    phone: '1234567890',
    leadStatus:'new',
    campaign:'KK',

    errorField: 'leadSource',
    errormsg:'Please fill out this field.'
  };
  exports.leadDataMandotoryFields = {
    leadName: 'grouptwo',
    company: 'tekarch',
    leadSource: 'web',
    industry: '',
    phone: '1234567890',
    leadStatus:'new',
    campaign:'KK',

    errorField: 'industry',
    errormsg:'Please fill out this field.'
  };
=======
    campaign: 'Campaigntest',
  };

  exports.leadEmailFieldValidation={
    leadName: 'Regina',
    company: 'BCBS',
    leadSource: 'web',
    industry:'IT',
    phone: '1234567890',
    email: 'reginaninza@tekarch.com',
    secondaryEmail: 'reginaninza@gmail.com',
    leadStatus:'new',
    campaign: 'Campaigntest',
  };

  exports.leadInvalidEmailFieldValidation={
    leadName: 'Regina',
    company: 'BCBS',
    leadSource: 'web',
    industry:'IT',
    phone: '1234567890',
    invalidEmail: 'reginaninza@tekarch',
    invalidSecondaryEmail: 'reginaninza.com',
    leadStatus:'new',
    campaign: 'Campaigntest',  
  };

  exports.leadPhoneValidation={
    leadName: 'Regina',
    company: 'BCBS',
    leadSource: 'web',
    industry:'IT',
    phone: '123456ab$*',
    leadStatus:'new',
    campaign: 'Campaigntest',
  };

  exports.leadInvalidRating = {
    leadName: 'Regina',
    company: 'BCBS',
    leadSource: 'web',
    industry:'IT',
    phone: '1234567890',
    rating: '20',
    leadStatus:'new',
    campaign: 'Campaigntest',
    errorField: "rating",
    errormsg:"Value must be less than or equal to 10.",
  };

  exports.leaveAddressInfoBlank = {
    leadName: 'Regina',
    company: 'BCBS',
    leadSource: 'web',
    industry:'IT',
    phone: '1234567890',
    leadStatus:'new',
    address: '',
    campaign: 'Campaigntest',
  };

  exports.validWebsiteField = {
    leadName: 'Regina',
    company: 'BCBS',
    leadSource: 'web',
    industry:'IT',
    phone: '1234567890',
    leadStatus:'new',
    website:'www.group2.com',
    campaign: 'Campaigntest',
  };

  exports.invalidWebsiteField = {
    leadName: 'Regina',
    company: 'BCBS',
    leadSource: 'web',
    industry:'IT',
    phone: '1234567890',
    leadStatus:'new',
    website:'group2',
    campaign: 'Campaigntest',
    errorField: "website",
    errormsg:"Invalid website URL",
  };

   exports.defaultValuesField = {
     leadName: 'Regina',
    company: 'BCBS',
    leadSource: 'web',
    industry:'IT',
    phone: '1234567890',
    leadStatus:'new',
    campaign: 'Campaigntest',
  };

  exports.blankCampaignField = {
     leadName: 'Regina',
    company: 'BCBS',
    leadSource: 'web',
    industry:'IT',
    phone: '1234567890',
    leadStatus:'new',
  };

  exports.blankPhoneField = {
     leadName: 'Regina',
    company: 'BCBS',
    leadSource: 'web',
    industry:'IT',
    leadStatus:'new',
    campaign: 'Campaigntest',
    errorField: "phone",
    errormsg:"Please fill out this field.",
  };

   exports.blankStatusField = {
     leadName: 'Regina',
    company: 'BCBS',
    leadSource: 'web',
    industry:'IT',
    phone: '1234567890',
    campaign: 'Campaigntest',
    errorField: "leadStatus",
    errormsg:"Please fill out this field.",
  };






>>>>>>> 3591c55ff0faf13451edf467cc1155ae87ec12dc
