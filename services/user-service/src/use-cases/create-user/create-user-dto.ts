import { User } from "../../entities/user/user";
import { CreateUserSchema, CreateUserSchemaDTO } from "./create-user-schema";

export class CreateUserReq {
  name: string;
  email: string;
  password: string;

  constructor(data: CreateUserSchemaDTO) {
    const parsedData = CreateUserSchema.parse(data);
    this.name = parsedData.name;
    this.email = parsedData.email;
    this.password = parsedData.password;
  }
}

export type CreateUserRes = Omit<User, 'password'>