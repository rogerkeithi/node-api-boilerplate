import { inject, injectable } from "inversify";
import { LoginReq, LoginRes } from "./login-dto";
import { IQueueService } from "../../infra/queue/interfaces/queue-interface";
import { IUserService } from "../../infra/services/interfaces/user-service-interface";

@injectable()
export class LoginUseCase {
    constructor(
		@inject("IQueueService") private queueService: IQueueService,
		@inject("IUserService") private userService: IUserService,
	){}
	async execute(data: LoginReq): Promise<LoginRes> {
		//just testing queues
		const userQueueUrl = process.env.AWS_USER_SQS || "http://localstack:4566/000000000000/user-queue";
		const message = {
			action: "GET_USER",
			payload: {
				email: data.email
			}
		}
		await this.queueService.sendMessage(userQueueUrl, JSON.stringify(message));

		const user = await this.userService.getUserInfo(data.email)
		console.log(user)

		const response = new LoginRes('','')
		return response
	}
}