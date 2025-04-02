import { User } from "../../entities/user/user";
import { FindUserSchema, FindUserSchemaDTO } from "./find-user-schema";

export class FindUserReq {
  id?: string;
  email?: string;
  timestamp?: any;
  receivedSignature?: any;

  constructor(data: FindUserSchemaDTO) {
    const parsedData = FindUserSchema.parse(data);
    this.id = parsedData.id ?? undefined;
    this.email = parsedData.email ?? undefined;
  }

  public setSignature(timestamp: any, receivedSignature: any){
    this.timestamp = timestamp ?? undefined;
    this.receivedSignature = receivedSignature ?? undefined;
  }
}

export type FindUserRes = Omit<User, 'password'> | User