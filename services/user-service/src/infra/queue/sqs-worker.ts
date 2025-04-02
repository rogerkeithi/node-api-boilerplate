import { inject, injectable } from "inversify";
import { IQueueService } from "./interfaces/queue-interface";
import { IWorkerService } from "./interfaces/worker-interface";

@injectable()
export class SQSWorker implements IWorkerService{
  constructor(@inject("IQueueService") private queueService: IQueueService) {}

  async processMessage(message: string): Promise<void> {
    console.log("Processing message:", message);
  }

  async startWorker(queueUrl: string): Promise<void> {
    console.log("Starting SQS Worker...");

    while (true) {
      try {
        const messages = await this.queueService.receiveMessages(queueUrl);

        for (const message of messages) {
          try {
            await this.processMessage(message.body);
            await this.queueService.deleteMessage(queueUrl, message.receiptHandle);
            console.log("Message deleted:", message.body);
          } catch (processError) {
            console.error("Error processing message:", processError);
          }
        }
      } catch (error) {
        console.error("Error fetching SQS messages:", error);
      }

      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}
