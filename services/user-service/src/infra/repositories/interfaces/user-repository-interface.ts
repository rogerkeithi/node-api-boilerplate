import { User } from "../../../entities/user/user";
import { UserDocument } from "../../models/user-model";

export interface IUserRepository {
    create(user: User): Promise<UserDocument>;
    findByEmail(email: string): Promise<UserDocument | null>;
    findById(_id: string): Promise<UserDocument | null>;
  }