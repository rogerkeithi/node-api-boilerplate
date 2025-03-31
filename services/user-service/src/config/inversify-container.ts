import { Container } from "inversify";
import { IUserReadRepository, IUserRepository } from "../infra/repositories/interfaces/user-repository-interface";
import { UserRepository } from "../infra/repositories/user-repository";
import { CreateUserUseCase } from "../use-cases/create-user/create-user-use-case";
import CreateUserController from "../controllers/create-user-controller";
import FindUserController from "../controllers/find-user-controller";
import { FindUserUseCase } from "../use-cases/find-user/find-user-use-case";
import { IDatabase } from "../infra/config/interfaces/database-interface";
import { MongoDatabase } from "../infra/config/mongo-conn";

const container = new Container();

//Controllers
container.bind<CreateUserController>(CreateUserController).toSelf();
container.bind<FindUserController>(FindUserController).toSelf();

//Use Cases
container.bind<CreateUserUseCase>(CreateUserUseCase).toSelf();
container.bind<FindUserUseCase>(FindUserUseCase).toSelf();

//Repositories
container.bind<IUserRepository>("IUserRepository").to(UserRepository);
container.bind<IUserReadRepository>("IUserReadRepository").to(UserRepository);

//Database
container.bind<IDatabase>("IDatabase").to(MongoDatabase);

export { container };