import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './config/swagger';
import swaggerUi from 'swagger-ui-express';
import createUserRoute from './routes/create-user-route';
import findUserRoute from "./routes/find-user-route";
import { container } from "./config/inversify-container";
import { IDatabase, IWorkerService } from "@rk-org/shared";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const database = container.get<IDatabase>("IDatabase");
const queueUrl = process.env.AWS_WORKER_QUEUE;
const worker = container.get<IWorkerService>("IWorkerService");
const startServer = async () => {
  try {
    await database.connect(); 
    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use(cors());
    app.use(express.json());
    app.use('/api', createUserRoute);
    app.use('/api', findUserRoute);
    app.listen(port, () => {
      console.log(`Server running!`);
    });
  } catch (error) {
    console.error('Error trying to init server:', error);
  }
  try {
    if(!queueUrl){
      throw new Error("Queue Url not specified.");
    }
    await worker.startWorker(queueUrl);
  } catch (error) {
    console.error("Worker encountered an error:", error);
    process.exit(1);
  }
};

startServer();
