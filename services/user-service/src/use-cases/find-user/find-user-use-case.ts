import { User } from "../../entities/user/user";
import { IUserRepository } from "../../infra/repositories/interfaces/user-repository-interface";
import { inject, injectable } from "inversify";
import { FindUserReq, FindUserRes } from "./find-user-dto";
import { UserDocument } from "../../infra/models/user-model";
import { UserMapper } from "../../entities/user/user-mapper";

@injectable()
export class FindUserUseCase {
    constructor(@inject("IUserRepository") private userRepository: IUserRepository){}
	async execute(data: FindUserReq): Promise<FindUserRes> {
		let userDocument: UserDocument | null = null;
		if(data.email){
			userDocument = await this.userRepository.findByEmail(data.email);
		}
		if(data.id){
			userDocument = await this.userRepository.findById(data.id);
		}
		if(!userDocument) {
			throw new Error('Usuario nao encontrado.')
		}else{
			const user = new User(
				userDocument.name,
				userDocument.email,
				userDocument.password,
				userDocument.id, 
				userDocument.createdAt, 
				userDocument.updatedAt
			  );
			return UserMapper.toDTO(user);
		}
	}
}