import { createProductJob } from "./message-queue/producers/index.js";

(async () => {
  await createProductJob({ title: "iphone 14 pro", description: "iphone 14 pro" });
  await createProductJob({ title: "iphone 14 pro", description: "iphone 14 pro" });
  await createProductJob({ title: "iphone 14 pro", description: "iphone 14 pro" });
})();
