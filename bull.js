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
      consumeJob(); // Continue to process next job
    }, 4000); // Delay of 2 seconds
  } else {
    console.log("Consumer: No job in the queue OR remove job from database");
  }
}

// Test the producer and consumer
produceJob("Job 1");
produceJob("Job 2");
produceJob("Job 3");

consumeJob();
