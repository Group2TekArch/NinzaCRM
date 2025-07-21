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
        },
        {
            "productName":"NinzaProdQA3",
            "quantity":"60.79",
            "price":"300",
            "category":"Electronics",
            "vendor":"Vendor_68300 - (Electronics)",
            "snapshot":"landing-2.png",
        },
        {
            "productName":"NinzaProdQA6",
            "quantity":"",
            "price":"300",
            "category":"Electronics",
            "vendor":"Vendor_68300 - (Electronics)",
            "snapshot":"landing-3.png",
        },
        {
            "productName":"NinzaProdQA7",
            "quantity":"-50",
            "price":"300",
            "category":"Electronics",
            "vendor":"Vendor_68300 - (Electronics)",
            "snapshot":"landing-4.png",
        },
        {
            "productName":"NinzaProdQA8",
            "quantity":"50",
            "price":"",
            "category":"Electronics",
            "vendor":"Vendor_68300 - (Electronics)",
            "snapshot":"landing-5.png",
        },
        {
            "productName":"NinzaProdQA9",
            "quantity":"50",
            "price":"-300",
            "category":"Electronics",
            "vendor":"Vendor_68300 - (Electronics)",
            "snapshot":"landing-6.png",
        }
       
       

    ];

    const invalidCategoryData = [
        {
            "productName":"NinzaProdQA5",
            "quantity":"50",
            "price":"300",
            "vendor":"Vendor_68300 - (Electronics)",
            "snapshot":"landing-7.png",
        }
    ];
    const invalidVendorData = [
        {
            "productName":"NinzaProdQA10",
            "quantity":"50",
            "price":"300",
            "category":"Electronics",
            "snapshot":"landing-8.png",
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