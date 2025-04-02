import { LoginSchema, LoginSchemaDTO } from "./login-schema";

export class LoginReq {
  email: string;
  password: string;

  constructor(data: LoginSchemaDTO) {
    const parsedData = LoginSchema.parse(data);
    this.email = parsedData.email;
    this.password = parsedData.password;
  }
}

export class LoginRes {
  accessToken: string;
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string,) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}