import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './config/swagger';
import swaggerUi from 'swagger-ui-express';
import createUserRoute from './routes/create-user-route';
import findUserRoute from "./routes/find-user-route";
import { IDatabase } from "./infra/config/interfaces/database-interface";
import { container } from "./config/inversify-container";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const database = container.get<IDatabase>("IDatabase");
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
      console.log(`Server running at http://localhost:${port}`);
      console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
};

startServer();
