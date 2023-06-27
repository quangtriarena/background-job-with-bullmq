import customerQueue from "./producer.js";

// Tạo công việc và gửi vào hàng đợi
export async function createCustomerJob(data) {
  const job = await customerQueue.add("createCustomerJob", data);
  console.log(`Created job ${job.id}`);
}
