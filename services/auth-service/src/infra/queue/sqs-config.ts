import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";
import { IQueueService } from "./interfaces/queue-interface";
import { injectable } from "inversify";

@injectable()
export class SQSService implements IQueueService {
  private sqsClient: SQSClient;

  constructor() {
    this.sqsClient = new SQSClient({
      region: process.env.AWS_REGION || "us-east-1",
      endpoint: process.env.AWS_SQS_ENDPOINT || "http://localstack:4566",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "test",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "test",
      },
    });
  }

  async sendMessage(queueUrl: string, message: string): Promise<void> {
    await this.sqsClient.send(new SendMessageCommand({ QueueUrl: queueUrl, MessageBody: message }));
  }

  async receiveMessages(queueUrl: string): Promise<{ body: string; receiptHandle: string }[]> {
    const response = await this.sqsClient.send(
      new ReceiveMessageCommand({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 5,
        VisibilityTimeout: 30,
      })
    );
  
    return (
      response.Messages?.map(msg => ({
        body: msg.Body || "",
        receiptHandle: msg.ReceiptHandle || "",
      })) || []
    );
  }

  async deleteMessage(queueUrl: string, receiptHandle: string): Promise<void> {
    await this.sqsClient.send(new DeleteMessageCommand({ QueueUrl: queueUrl, ReceiptHandle: receiptHandle }));
  }
}
