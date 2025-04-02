import "reflect-metadata";
import { container } from "./config/inversify-container";
import { IWorkerService } from "./infra/queue/interfaces/worker-interface";

async function start() {
  const worker = container.get<IWorkerService>("IWorkerService");
  const queueUrl: string = process.env.AWS_WORKER_QUEUE || "http://localstack:4566/000000000000/queue";
  try {
    await worker.startWorker(queueUrl);
  } catch (error) {
    console.error("Worker encountered an error:", error);
    process.exit(1);
  }
}

start();