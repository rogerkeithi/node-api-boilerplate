import { CreateUserReq, CreateUserRes } from "./create-user-dto";
import { User } from "../../entities/user/user";
import { IUserRepository } from "../../infra/repositories/interfaces/user-repository-interface";
import { inject, injectable } from "inversify";
import { UserMapper } from "../../entities/user/user-mapper";

@injectable()
export class CreateUserUseCase {
    constructor(@inject("IUserRepository") private userRepository: IUserRepository){}
	async execute(data: CreateUserReq): Promise<CreateUserRes> {
		const existingUser = await this.userRepository.findOneByFilter({email: data.email});
		if (existingUser) {
		  throw new Error("E-mail já está em uso.");
		}
		const userToCreate = new User(data.name, data.email, data.role, data.password);
		const userDocument = await this.userRepository.create(userToCreate);
		const user = new User(
			userDocument.name,
			userDocument.email,
			userDocument.role,
			userDocument.password,
			userDocument.id, 
			userDocument.createdAt, 
			userDocument.updatedAt
		  );
		return UserMapper.toDTO(user);
	}
}