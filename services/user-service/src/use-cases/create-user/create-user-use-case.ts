import { randomUUID } from "crypto";
import { CreateUserReq } from "./create-user-dto";
import { User } from "../../entities/user/user";
import { IUserRepository } from "../../infra/repositories/interfaces/user-repository-interface";

export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository){}
	async execute(data: CreateUserReq): Promise<User> {
		const id = randomUUID();
		const user = new User(id, data.name, data.email, data.password);
		return await this.userRepository.create(user);
	}
}