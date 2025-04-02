export interface IWorkerService {
    processMessage(message: string): Promise<void>;
    startWorker(queueUrl: string): Promise<void>;
  }