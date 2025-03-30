import { User } from "../../../entities/user/user";
import { UserDocument } from "../../models/user-model";

export interface IUserRepository extends IUserReadRepository, IUserWriteRepository{}

export interface IUserReadRepository {
  findOneByFilter(params: Partial<Pick<UserDocument, '_id' | 'email'>>): Promise<UserDocument | null>;
}

export interface IUserWriteRepository {
  create(user: User): Promise<User>;
}