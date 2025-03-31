import { Container } from "inversify";
import { IDatabase } from "../infra/config/interfaces/database-interface";
import { MongoDatabase } from "../infra/config/mongo-conn";

const container = new Container();

//Controllers

//Use Cases

//Repositories

//Database
container.bind<IDatabase>("IDatabase").to(MongoDatabase);

export { container };