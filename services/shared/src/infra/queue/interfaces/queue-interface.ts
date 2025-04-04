export interface IQueueService {
  sendMessage(queueUrl: string, message: string): Promise<void>;
  receiveMessages(queueUrl: string): Promise<{ body: string; receiptHandle: string }[]>;
  deleteMessage(queueUrl: string, receiptHandle: string): Promise<void>;
}