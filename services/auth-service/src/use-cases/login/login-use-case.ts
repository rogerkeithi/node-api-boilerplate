import { inject, injectable } from "inversify";
import { LoginReq, LoginRes } from "./login-dto";
import { IUserService } from "../../infra/services/interfaces/user-service-interface";
import { generateToken, IQueueService, verifyPassword } from "@rk-org/shared";

@injectable()
export class LoginUseCase {
    constructor(
		@inject("IQueueService") private queueService: IQueueService,
		@inject("IUserService") private userService: IUserService,
	){}
	async execute(data: LoginReq): Promise<LoginRes> {
		const user = await this.userService.getUserInfo(data.email);
		const isPasswordEqual = await verifyPassword(data.password, user.password);

		if(!isPasswordEqual){
			throw new Error("Incorrect credentials");
		}

		const accessToken = generateToken({ userId: user.id }, "30m");
		const refreshToken = generateToken({ userId: user.id }, "7d");
		const response = new LoginRes(accessToken, refreshToken)

		//Just testing queues
		const message = {
			action: "GET_USER",
			payload: {
				email: data.email
			}
		}
		const userQueueUrl = process.env.AWS_USER_SQS || "";
		if(!userQueueUrl){
			throw new Error("User queue url has not been specified.");
		}
		await this.queueService.sendMessage(userQueueUrl, JSON.stringify(message));
		//=====================

		return response
	}
}