import express from "express";
import CreateUserController from "../controllers/create-user-controller";
import { asyncWrapper } from "../config/async-wrapper";
import { container } from "../config/inversify-container";

const createUserRoute = express.Router();
const createUserController = container.get<CreateUserController>(CreateUserController);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Criar usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao.silva@email.com"
 *               role:
 *                 type: string
 *                 enum:
 *                   - "USER"
 *                   - "ADMIN"
 *                   - "MODERATOR"
 *                 example: "USER"
 *               password:
 *                 type: string
 *                 example: "******"
 *     responses:
 *       201:
 *         description: Cria um novo usuário
 *       400:
 *         description: Dados inválidos ou erro de validação
 */
createUserRoute.post("/user", asyncWrapper(createUserController.execute.bind(createUserController)));

export default createUserRoute;
