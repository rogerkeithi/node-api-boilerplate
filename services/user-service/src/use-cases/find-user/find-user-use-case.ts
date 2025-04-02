import { User } from "../../entities/user/user";
import { IUserReadRepository } from "../../infra/database/repositories/interfaces/user-repository-interface";
import { inject, injectable } from "inversify";
import { FindUserReq, FindUserRes } from "./find-user-dto";
import { UserDocument } from "../../infra/database/models/user-model";
import { UserMapper } from "../../entities/user/user-mapper";
import { generateSignature } from "../../config/generate-signature";

@injectable()
export class FindUserUseCase {
	private userSecretKey = process.env.USER_SECRET_KEY || "supersecretkey";

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

			if(data.receivedSignature && data.timestamp){
				let timeStampReceived: Date = new Date();
				try {
					timeStampReceived = new Date(data.timestamp);
				} catch (error) {
					throw new Error("Error trying to convert date of timestamp");
				}
				const signature = generateSignature(this.userSecretKey, timeStampReceived)
				console.log('assinatura gerada:' + signature.signature)
				console.log('===============================================')
				console.log('assinatura recebida:' + data.receivedSignature)

				if(signature == data.receivedSignature)
					console.log('Equal signatures')
					return user;
			}

			return UserMapper.toDTO(user);
		}
	}
}