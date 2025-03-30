import { Request, Response } from "express";
import { CreateUserUseCase } from "../use-cases/create-user/create-user-use-case";
import { CreateUserReq } from "../use-cases/create-user/create-user-dto";
import { BaseController } from "./base/base-controller";
import { HttpStatus } from "../config/http-status";
import { inject, injectable } from "inversify";
@injectable()
export default class CreateUserController extends BaseController {
  constructor(@inject(CreateUserUseCase) private createUserUseCase: CreateUserUseCase) {
    super();
  }

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const createUserReq = new CreateUserReq(req.body);
      const user = await this.createUserUseCase.execute(createUserReq);
      return this.success(res, user, HttpStatus.CREATED);
    } catch (error) {
      return this.error(res, error);
    }
  }
}
