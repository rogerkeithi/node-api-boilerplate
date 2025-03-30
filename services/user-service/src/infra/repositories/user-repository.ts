import { User } from "../../entities/user/user";
import { UserDocument, userModel } from "../models/user-model";
import { IUserRepository } from "./interfaces/user-repository-interface";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<UserDocument> {
    return await userModel.create(user);
  }
  async findByEmail(email: string): Promise<UserDocument | null> {
    const userDocument = await userModel.findOne({ email });
    if (!userDocument) return null;
    return userDocument;
  }
  async findById(_id: string): Promise<UserDocument | null> {
    const userDocument = await userModel.findOne({ _id });
    if (!userDocument) return null;
    return userDocument;
  }
}