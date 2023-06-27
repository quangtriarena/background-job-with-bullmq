const productQueue = require("./producer.js");

// Tạo công việc và gửi vào hàng đợi

async function createProductJob(data) {
  try {
    // slice product list, one list has 3 product and list 2 has 3 product
    // const productList1 = data.slice(0, 3);
    // const productList2 = data.slice(3);
    /**
     * chỗ productQueue.add() => gửi 1 job đến worker
     */
    const job = await productQueue.add(`createProductJob-${Date.now()}`, data);
    // const job1 = await productQueue.add(`createProductJob-${Date.now()}`, productList1);
    // const job2 = await productQueue.add(`createProductJob-${Date.now()}`, productList2);
    // console.log("job1", job1);
    // console.log("job2", job2);

    return job;
  } catch (error) {
    console.log("error", error);
  }
}

async function getProductResult(jobId) {
  try {
    // Lấy kết quả từ công việc dựa trên jobId
    const job = await productQueue.getJob(jobId);

    // Kiểm tra công việc và trả về kết quả nếu có
    if (job && job.returnvalue) {
      return job.returnvalue;
    } else {
      throw new Error("Job not found or result not available");
    }
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = { createProductJob, getProductResult };
