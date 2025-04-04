import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { FindUserUseCase } from "../use-cases/find-user/find-user-use-case";
import { FindUserReq } from "../use-cases/find-user/find-user-dto";
import { BaseController, HttpStatus } from "@rk-org/shared";
@injectable()
export default class FindUserController extends BaseController {
  constructor(@inject(FindUserUseCase) private findUserUseCase: FindUserUseCase) {
    super();
  }

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const findUserReq = new FindUserReq(req.query);
      const { "x-timestamp": timestamp, "x-signature": receivedSignature } = req.headers;
      findUserReq.setSignature(timestamp, receivedSignature)
      const user = await this.findUserUseCase.execute(findUserReq);
      return this.success(res, user, HttpStatus.OK);
    } catch (error) {
      return this.error(res, error);
    }
  }
}
