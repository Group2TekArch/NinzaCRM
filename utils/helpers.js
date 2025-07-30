    async function generateRandomEmail() {
        const randomNum = Math.floor(1000 + Math.random() * 9000); 
        return `user_${randomNum}@example.com`;
    }

    async function generateRandomMobileNo(){
        const randomNum = Math.floor(1000000000 + Math.random() * 9000000000); 
        return `${randomNum}`;
      }

    async function generateRandomUserName(){
        const randomNum = Math.floor(1000 + Math.random() * 9000); 
        return `user_${randomNum}`;
      }

    async function generateRandomString(length = 5) {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      }

export const helpers = {
    generateRandomEmail,
    generateRandomMobileNo,
    generateRandomUserName,
    generateRandomString
  };