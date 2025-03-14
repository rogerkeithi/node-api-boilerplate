import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './config/swagger';
import swaggerUi from "swagger-ui-express";
import userRoutes from './routes/user-routes';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());

app.use(express.json());

app.use("/api", userRoutes);

app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);
console.log(`Swagger docs available at http://localhost:4001/api-docs`);
});