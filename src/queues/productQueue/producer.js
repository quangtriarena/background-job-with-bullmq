const { Queue, Worker } = require("bullmq");
const Redis = require("ioredis");
const fs = require("fs");
const path = require("path");
const BackgroundModel = require("../../models/background_job.js");
const axios = require("axios");

console.log(`https://${process.env.SHOP}/admin/api/${process.env.API_VER}/products.json`);

const STATUS = {
  PENDING: "PENDING",
  RUNNING: "RUNNING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  CANCELED: "CANCELED",
};

// Tạo kết nối Redis
const redisClient = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

const productQueue = new Queue("productQueue", {
  connection: redisClient,
});

const workerProduct = new Worker(
  "productQueue",
  async (job) => {
    try {
      // let totalProcesses = job.data.length;

      /**
       * create product shopify api
       * url: https://${process.env.SHOP}/admin/api/${process.env.API_VER}/products.json
       * method: POST
       *
       * step 1:
       * step 2:
       * step 3:
       */
      let listProductCreate = [];

      return await new Promise((resolve, reject) => {
        let count = 0;
        let totalProcesses = job.data.length;

        for (let i = 0; i < totalProcesses; i++) {
          let product = job.data[i];
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
                let processProgress = Math.trunc((count / totalProcesses) * 100);
                console.log(`Process ${job.id}: ${processProgress}% running`);

                job.updateProgress(processProgress);

                if (count == totalProcesses) resolve(listProductCreate);
              });
          }, i * 500);
        }
      });

      //update progress
      // for (let i = 0; i < totalProcesses; i++) {
      //   const processProgress = Math.trunc(((i + 1) / totalProcesses) * 100);
      //   console.log(`Process ${job.id}: ${processProgress}% running`);

      //   await job.updateProgress(processProgress);
      //   await new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //       resolve(1);
      //     }, i * 5000);
      //   });
      // }

      // console.log(`Process ${job.id}: job complete`);
      //save queue name and job name to database
      // await BackgroundModel.
    } catch (error) {
      console.log("error", error);
    }
  },
  {
    concurrency: 1,
    connection: redisClient,
  }
);

// Khởi động worker
workerProduct.on("completed", (job) => {
  fs.appendFileSync("db.js", JSON.stringify(job.returnvalue.map((_prod) => _prod.product)), {
    encoding: "utf8",
  });
  console.log("job.data", job.returnvalue);
  console.log(`Job ${job.id} completed`);
});

workerProduct.on("progress", (job, progress) => {
  // Do something with the return value.
});

workerProduct.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed with error: ${err}`);
});

module.exports = productQueue;
