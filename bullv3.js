const processJob = (jobData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Processing job: ${jobData}`);
      resolve();
    }, 2000);
  });
};

const createJob = (jobData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Creating job: ${jobData}`);
      resolve();
    }, 1000);
  });
};

const enqueueJobs = async () => {
  for (let i = 0; i < 10; i++) {
    const jobData = `Job ${i + 1}`;
    await createJob(jobData);
    await processJob(jobData);
  }
};

enqueueJobs()
  .then(() => {
    console.log("All jobs completed successfully.");
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
