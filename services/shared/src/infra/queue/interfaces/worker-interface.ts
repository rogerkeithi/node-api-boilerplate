export interface IWorkerService {
    startWorker(queueUrl: string): Promise<void>;
  }