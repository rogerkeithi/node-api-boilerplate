import { Container } from "inversify";
import { LoginUseCase } from "../use-cases/login/login-use-case";
import LoginController from "../controllers/login-controller";
import { IQueueService } from "../infra/queue/interfaces/queue-interface";
import { SQSService } from "../infra/queue/sqs-config";
import { SQSWorker } from "../infra/queue/sqs-worker";
import { IWorkerService } from "../infra/queue/interfaces/worker-interface";

const container = new Container();

//Controllers
container.bind<LoginController>(LoginController).toSelf();

//Use Cases
container.bind<LoginUseCase>(LoginUseCase).toSelf();

//Services
container.bind<IQueueService>("IQueueService").to(SQSService);
container.bind<IWorkerService>("IWorkerService").to(SQSWorker);

export { container };