const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const CORS = require("cors");

const productQueue = require("./queues/productQueue/producer.js");
const customerQueue = require("./queues/customerQueue/producer.js");
const orderQueue = require("./queues/orderQueue/producer.js");

const PRODUCT_LIST = require("../data.js");

const { createProductJob, getProductResult } = require("./queues/productQueue/consumer.js");

const port = process.env.PORT || 9000;

// ------------ enable bull-ui -----------
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");
createBullBoard({
  queues: [
    new BullMQAdapter(productQueue),
    new BullMQAdapter(customerQueue),
    new BullMQAdapter(orderQueue),
  ],
  serverAdapter: serverAdapter,
});

/**
 * config global app
 */
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// middleware CORS
app.use(CORS());
/**
 * end config global app
 */

/**
 * router
 */

app.post("/products", async (req, res) => {
  try {
    await createProductJob(PRODUCT_LIST);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

app.get("/products/all", (req, res) => {
  try {
    const data = fs.readFileSync(`${path.join(process.cwd(), "db.js")}`, "utf8");

    res.status(200).json({
      success: true,
      data: JSON.parse(data),
    });
  } catch (error) {
    res.status(200).json({
      data: [],
    });
  }
});

app.get("/products/job/:jobId", async (req, res) => {
  try {
    let { jobId } = req.params;

    let data = await getProductResult(jobId);
    let newData = data.map((_prod) => _prod.product);

    res.status(200).json({
      success: true,
      data: newData,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

/**
 * router for admin dashboard follow background jobs
 */
app.use("/admin/queues", serverAdapter.getRouter());

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
  console.log(`For the UI, open http://localhost:${port}/admin/queues`);
  console.log("Make sure Redis is running on port 6379 by default");
});
