import { inject, injectable } from "inversify";
import { LoginReq, LoginRes } from "./login-dto";
import { IQueueService } from "../../infra/queue/interfaces/queue-interface";

@injectable()
export class LoginUseCase {
    constructor(@inject("IQueueService") private queueService: IQueueService){}
	async execute(data: LoginReq): Promise<LoginRes> {
		const userQueueUrl = process.env.AWS_USER_SQS || "http://localstack:4566/000000000000/user-queue";

		const message = {
			action: "GET_USER",
			payload: {
				email: data.email
			}
		}
		console.log(await this.queueService.sendMessage(userQueueUrl, JSON.stringify(message)))
		const response = new LoginRes('','')
		return response
	}
}