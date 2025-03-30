import { User } from "../../entities/user/user";
import { FindUserSchema, FindUserSchemaDTO } from "./find-user-schema";

export class FindUserReq {
  id?: string;
  email?: string;

  constructor(data: FindUserSchemaDTO) {
    const parsedData = FindUserSchema.parse(data);
    this.id = parsedData.id ?? undefined;
    this.email = parsedData.email ?? undefined;
  }
}

export type FindUserRes = Omit<User, 'password'>