    const validData = [
        {
            "productName":"NinzaProdQA21",
            "quantity":"50",
            "price":"300",
            "category":"Electronics",
            "vendor":"Vendor_68300 - (Electronics)",
        },
        {
            "productName":"NinzaProdQA4",
            "quantity":"50",
            "price":"89.99",
            "category":"Electronics",
            "vendor":"Vendor_68300 - (Electronics)",
        }
    ];
        const invalidData= [
        {
            "productName":"",
            "quantity":"50",
            "price":"300",
            "category":"Electronics",
            "vendor":"Vendor_68300 - (Electronics)",
            "snapshot":"landing-1.png",
            "errorField": "productName",
            "errormsg":"Please fill out this field."
        },
        {
            "productName":"NinzaProdQA3",
            "quantity":"60.79",
            "price":"300",
            "category":"Electronics",
            "vendor":"Vendor_68300 - (Electronics)",
            "snapshot":"landing-2.png",
            "errorField": "quantity",
            "errormsg":"Please enter a valid value. The two nearest valid values are 60 and 61."
        },
        {
            "productName":"NinzaProdQA6",
            "quantity":"",
            "price":"300",
            "category":"Electronics",
            "vendor":"Vendor_68300 - (Electronics)",
            "snapshot":"landing-3.png",
            "errorField": "quantity",
            "errormsg":"Please fill out this field."
        },
        {
            "productName":"NinzaProdQA7",
            "quantity":"-50",
            "price":"300",
            "category":"Electronics",
            "vendor":"Vendor_68300 - (Electronics)",
            "snapshot":"landing-4.png",
            "errorField": "quantity",
            "errormsg":"Value must be greater than or equal to 1."
        },
        {
            "productName":"NinzaProdQA8",
            "quantity":"50",
            "price":"",
            "category":"Electronics",
            "vendor":"Vendor_68300 - (Electronics)",
            "snapshot":"landing-5.png",
            "errorField": "price",
            "errormsg":"Please fill out this field."
        },
        {
            "productName":"NinzaProdQA9",
            "quantity":"50",
            "price":"-300",
            "category":"Electronics",
            "vendor":"Vendor_68300 - (Electronics)",
            "snapshot":"landing-6.png",
            "errorField": "price",
            "errormsg":"Value must be greater than or equal to 0.01."
        }
       
       

    ];

    const invalidCategoryData = [
        {
            "productName":"NinzaProdQA5",
            "quantity":"50",
            "price":"300",
            "vendor":"Vendor_68300 - (Electronics)",
            "snapshot":"landing-7.png",
            "errorField": "categoryDropdown",
            "errormsg":"Please select an item in the list."
        }
    ];
    const invalidVendorData = [
        {
            "productName":"NinzaProdQA10",
            "quantity":"50",
            "price":"300",
            "category":"Electronics",
            "snapshot":"landing-8.png",
            "errorField": "vendorDropdown",
            "errormsg":"Please select an item in the list."
        }
    ];

    const duplicateProductData = [
        {
            "productName":"NinzaProdQA-22",
            "quantity":"50",
            "price":"300",
            "category":"Electronics",
            "vendor":"Vendor_68300 - (Electronics)",
        }
    ];

    module.exports = {
        validData,
        invalidData,
        invalidCategoryData,
        invalidVendorData,
        duplicateProductData
      };