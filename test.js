const axios = require("axios");

const PRODUCT_LIST = [
  {
    title: "Burton Custom Freestyle 151",
    body_html: "<strong>Good snowboard!</strong>",
    vendor: "Burton",
    product_type: "Snowboard",
    status: "draft",
  },
  {
    title: "Burton Custom Freestyle 152",
    body_html: "<strong>Good snowboard!</strong>",
    vendor: "Burton",
    product_type: "Snowboard",
    status: "draft",
  },
];

(async () => {
  try {
    let listProductCreate = [];

    await new Promise((resolve, reject) => {
      let count = 0;
      let total = 2;

      for (let i = 0; i < total; i++) {
        let product = PRODUCT_LIST[i];
        setTimeout(() => {
          axios({
            method: "POST",
            url: `https://tamaki-co-shop.myshopify.com/admin/api/2023-04/products.json`,
            headers: {
              "X-Shopify-Access-Token": "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",
              "Content-Type": "application/json",
            },
            data: {
              product: {
                ...product,
              },
            },
          })
            .then((_res) => {
              listProductCreate.push(_res.data);
            })
            .then(() => {
              count++;

              if (count == total) resolve(listProductCreate);
            });
        }, i * 500);
      }
    }).then((_data) => console.log("_data", _data));
  } catch (error) {
    console.log("error", error);
  }
})();
