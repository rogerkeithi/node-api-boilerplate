import { Request, Response } from "express";
import { CreateUserReq } from "../use-cases/create-user/create-user-dto";
import { BaseController } from "./base/base-controller";
import { HttpStatus } from "../config/http-status";
import { inject, injectable } from "inversify";
import { FindUserUseCase } from "../use-cases/find-user/find-user-use-case";
import { FindUserReq } from "../use-cases/find-user/find-user-dto";
@injectable()
export default class FindUserController extends BaseController {
  constructor(@inject(FindUserUseCase) private findUserUseCase: FindUserUseCase) {
    super();
  }

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const findUserReq = new FindUserReq(req.query);
      const user = await this.findUserUseCase.execute(findUserReq);
      return this.success(res, user, HttpStatus.OK);
    } catch (error) {
      return this.error(res, error);
    }
  }
}
