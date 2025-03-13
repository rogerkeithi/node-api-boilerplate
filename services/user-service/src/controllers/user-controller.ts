import { Request, Response } from 'express';
import { CreateUserUseCase } from '../use-cases/create-user/create-user-use-case';

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;
      const user = await this.createUserUseCase.execute();
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: 'error.message' });
    }
  }
}