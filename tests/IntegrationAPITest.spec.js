const { test, expect,request } = require('@playwright/test');
const {generateCreateUserPayload,generateCampaignPayload} = require('../test-data/IntegrationAPITestPayload');
let nonadminusername, nonadminpassword,jwtToken,campaignID;

test('Create non Admin user', async() =>{
    const apiContext = await request.newContext({
        httpCredentials: {
          username: 'rmgyantra',
          password: 'rmgy@9999'
        }
      });
      const userdata = await generateCreateUserPayload();
      console.log("payload:",userdata);
      const response = await apiContext.post('http://49.249.28.218:8098/admin/create-user',{
        data:userdata
      });
    
      console.log('Status:', response.status());
      console.log('Body:', await response.text());
    
      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(201);
      const body = await response.json();
      expect(body).toContain(body.username);
      expect(body.username).toEqual(userdata.username);
      expect(body).toContain(body.password);
      expect(body.username).toEqual(userdata.password);
})


test('Login using non Admin user',async() => {
    const userdata = await generateCreateUserPayload();
    const password = userdata.password;
    const apiContext = await request.newContext({
        httpCredentials: {
          username: nonadminusername,
          password: password
        }
      });
    
      const response = await apiContext.get('http://49.249.28.218:8098/login');
    
      console.log('Status:', response.status());
      console.log('Body:', await response.text());
    
      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(202);
      const body = await response.json();
      expect(body.msg).toEqual("Successfully Logged In");
      jwtToken = body.jwtToken;
      console.log('jwtToken:', jwtToken);
})

test('Create campaign', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await generateCampaignPayload();
    const response = await apiContext.post('http://49.249.28.218:8098/campaign', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        data:campaigndata
      });

      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(201);
      const body = await response.json();
      console.log('body',body);
      campaignID = body.campaignId;
      console.log('campaign ID:',campaignID)
      expect(campaignID).toBeTruthy();
      expect(campaignID.length).toBeGreaterThan(0);
})