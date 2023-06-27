const { Queue } = require("bullmq");
const Redis = require("ioredis");

// Tạo kết nối Redis
const redisClient = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

const orderQueue = new Queue("orderQueue", {
  connection: redisClient,
});

module.exports = orderQueue;
