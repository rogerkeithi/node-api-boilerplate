import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { LoginUseCase } from "../use-cases/login/login-use-case";
import { LoginReq } from "../use-cases/login/login-dto";
import { BaseController, HttpStatus } from "@rk-org/shared";
@injectable()
export default class LoginController extends BaseController {
  constructor(@inject(LoginUseCase) private loginUseCase: LoginUseCase) {
    super();
  }

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const loginReq = new LoginReq(req.body);
      const response = await this.loginUseCase.execute(loginReq);
      return this.success(res, response, HttpStatus.OK);
    } catch (error) {
      return this.error(res, error);
    }
  }
}
