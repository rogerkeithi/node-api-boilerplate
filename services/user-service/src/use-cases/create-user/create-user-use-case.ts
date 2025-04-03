import { CreateUserReq, CreateUserRes } from "./create-user-dto";
import { User } from "../../entities/user/user";
import { IUserRepository } from "../../infra/database/repositories/interfaces/user-repository-interface";
import { inject, injectable } from "inversify";
import { UserMapper } from "../../entities/user/user-mapper";
import { hashPassword } from "../../utils/hash-handler";

@injectable()
export class CreateUserUseCase {
    constructor(@inject("IUserRepository") private userRepository: IUserRepository){}
	async execute(data: CreateUserReq): Promise<CreateUserRes> {
		const existingUser = await this.userRepository.findOneByFilter({email: data.email});
		if (existingUser) {
		  throw new Error("E-mail já está em uso.");
		}
		const hashed = await hashPassword(data.password);
		const userToCreate = new User(data.name, data.email, data.role, hashed);
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