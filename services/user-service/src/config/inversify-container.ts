import { Container } from "inversify";
import { IUserReadRepository, IUserRepository } from "../infra/database/repositories/interfaces/user-repository-interface";
import { UserRepository } from "../infra/database/repositories/user-repository";
import { CreateUserUseCase } from "../use-cases/create-user/create-user-use-case";
import CreateUserController from "../controllers/create-user-controller";
import FindUserController from "../controllers/find-user-controller";
import { FindUserUseCase } from "../use-cases/find-user/find-user-use-case";
import { IDatabase } from "../infra/database/config/interfaces/database-interface";
import { MongoDatabase } from "../infra/database/config/mongo-conn";
import { SQSService } from "../infra/queue/sqs-config";
import { IQueueService } from "../infra/queue/interfaces/queue-interface";
import { SQSWorker } from "../infra/queue/sqs-worker";
import { IWorkerService } from "../infra/queue/interfaces/worker-interface";

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

//Services
container.bind<IQueueService>("IQueueService").to(SQSService);
container.bind<IWorkerService>("IWorkerService").to(SQSWorker);

//Databases
container.bind<IDatabase>("IDatabase").to(MongoDatabase);

export { container };