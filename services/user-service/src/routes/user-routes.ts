import express from "express";
import { UserRepository } from "../infra/repositories/user-repository";
import { CreateUserUseCase } from "../use-cases/create-user/create-user-use-case";
import CreateUserController from "../controllers/create-user-controller";

const userRoutes = express.Router();

const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserController = new CreateUserController(createUserUseCase);

const asyncWrapper = (fn: any) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

userRoutes.post("/users", asyncWrapper(createUserController.execute.bind(createUserController)));

export default userRoutes;
