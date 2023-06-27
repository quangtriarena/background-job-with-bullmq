import fs from "fs";

const queue = [];

// Producer
function produceJob(data) {
  queue.push(data);
  console.log(`Producer: Created job with data ${data}`);
}

// Consumer
function consumeJob() {
  const job = queue.shift();
  if (job) {
    console.log(`Consumer: Processing job with data ${job}`);
    // Simulate job processing time
    setTimeout(() => {
      console.log(`Consumer: Job with data ${job} processed`);

      // Write the result to data.json
      fs.appendFileSync("data.json", `${job}\n`);

      consumeJob(); // Continue to process next job
    }, 5000); // Delay of 2 seconds
  } else {
    console.log("Consumer: No job in the queue");
  }
}

// Worker Pool
function startWorkerPool(numWorkers) {
  console.log(`Starting ${numWorkers} workers...`);
  for (let i = 0; i < numWorkers; i++) {
    consumeJob();
  }
}

// Test the producer and worker pool
produceJob("Job 1");
produceJob("Job 2");
produceJob("Job 3");
produceJob("Job 4");
produceJob("Job 5");

console.log("queue", queue);

startWorkerPool(3);
