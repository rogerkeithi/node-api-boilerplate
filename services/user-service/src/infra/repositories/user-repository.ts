import { User } from "../../entities/user/user";
import { UserMapper } from "../../entities/user/user-mapper";
import userModel from "../models/user-model";
import { IUserRepository } from "./interfaces/user-repository-interface";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const userData = UserMapper.toPersistence(user);
    const newUser = await userModel.create(userData);
    return UserMapper.toDomain(newUser);
  }
  async findByEmail(email: string): Promise<User | null> {
    const userDocument = await userModel.findOne({ email });
    if (!userDocument) return null;
    return UserMapper.toDomain(userDocument);
  }
}