
import { Roles } from "@rk-org/shared";
import { User } from "../../entities/user/user";
import { CreateUserSchema, CreateUserSchemaDTO } from "./create-user-schema";

export class CreateUserReq {
  name: string;
  email: string;
  role: Roles;
  password: string;

  constructor(data: CreateUserSchemaDTO) {
    const parsedData = CreateUserSchema.parse(data);
    this.name = parsedData.name;
    this.email = parsedData.email;
    this.role = parsedData.role as Roles;
    this.password = parsedData.password;
  }
}

export type CreateUserRes = Omit<User, 'password'>