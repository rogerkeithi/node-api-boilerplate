import { User } from "../../entities/user/user";
import { IUserReadRepository } from "../../infra/database/repositories/interfaces/user-repository-interface";
import { inject, injectable } from "inversify";
import { FindUserReq, FindUserRes } from "./find-user-dto";
import { UserDocument } from "../../infra/database/models/user-model";
import { UserMapper } from "../../entities/user/user-mapper";

@injectable()
export class FindUserUseCase {
    constructor(@inject("IUserReadRepository") private userReadRepository: IUserReadRepository){}
	async execute(data: FindUserReq): Promise<FindUserRes> {
		let userDocument: UserDocument | null = null;
		
		const filter: Record<string, string> = {};
		if (data.id) filter._id = data.id;
		if (data.email) filter.email = data.email;

		userDocument = await this.userReadRepository.findOneByFilter(filter);
		if(!userDocument) {
			throw new Error('Usuario nao encontrado.')
		}else{
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
}