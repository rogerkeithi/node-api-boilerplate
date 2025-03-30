import { User } from "../../entities/user/user";
import { UserDocument, userModel } from "../models/user-model";
import { IUserRepository } from "./interfaces/user-repository-interface";

export class UserRepository implements IUserRepository  {
  async create(user: User): Promise<UserDocument> {
    const userDocument = new userModel({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    return await userDocument.save();
  }
  async findOneByFilter(params: Partial<Pick<UserDocument, '_id' | 'email'>>): Promise<UserDocument | null> {
    const userDocument = await userModel.findOne(params);
    if (!userDocument) return null;
    return userDocument;
  }
}