import { Container } from "inversify";
import { IUserReadRepository, IUserRepository } from "../infra/database/repositories/interfaces/user-repository-interface";
import { UserRepository } from "../infra/database/repositories/user-repository";
import { CreateUserUseCase } from "../use-cases/create-user/create-user-use-case";
import CreateUserController from "../controllers/create-user-controller";
import FindUserController from "../controllers/find-user-controller";
import { FindUserUseCase } from "../use-cases/find-user/find-user-use-case";
import { IDatabase, IQueueService, IWorkerService } from "@rk-org/shared";
import { MongoDatabase } from "../infra/database/config/mongo-conn";
import { SQSWorker } from "../infra/queue/sqs-worker";
import { SQSService } from "../infra/queue/config/sqs-config";

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

//Database
container.bind<IQueueService>("IQueueService").to(SQSService);

//Worker
container.bind<IWorkerService>("IWorkerService").to(SQSWorker);

export { container };