import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './config/swagger';
import swaggerUi from 'swagger-ui-express';
import loginRoute from "./routes/login-route";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const startServer = async () => {
  try {
    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use(cors());
    app.use(express.json());
    app.use('/api', loginRoute);
    app.listen(port, () => {
      console.log(`Server running!`);
    });
  } catch (error) {
    console.error('Error trying to init server:', error);
  }
};

startServer();
