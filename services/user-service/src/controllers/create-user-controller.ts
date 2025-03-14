import { Request, Response } from "express";
import { CreateUserUseCase } from "../use-cases/create-user/create-user-use-case";
import { CreateUserReq } from "../use-cases/create-user/create-user-dto";

export default class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;
      const createUserReq = new CreateUserReq(name, email, password);
      const user = await this.createUserUseCase.execute(createUserReq);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({error});
    }
  }
}
