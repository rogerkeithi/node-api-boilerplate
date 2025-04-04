import { Container } from "inversify";
import { LoginUseCase } from "../use-cases/login/login-use-case";
import LoginController from "../controllers/login-controller";
import { IUserService } from "../infra/services/interfaces/user-service-interface";
import { UserService } from "../infra/services/user-service";
import { IQueueService } from "@rk-org/shared";
import { SQSService } from "../infra/queue/config/sqs-config";

const container = new Container();

//Controllers
container.bind<LoginController>(LoginController).toSelf();

//Use Cases
container.bind<LoginUseCase>(LoginUseCase).toSelf();

//Services
container.bind<IUserService>("IUserService").to(UserService);

//Queue
container.bind<IQueueService>("IQueueService").to(SQSService);

export { container };