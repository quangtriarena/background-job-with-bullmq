import orderQueue from "./producer.js";

// Tạo công việc và gửi vào hàng đợi
export async function createOrderQueue(data) {
  const job = await orderQueue.add("createOrderQueue", data);
  console.log(`Created job ${job.id}`);
}
