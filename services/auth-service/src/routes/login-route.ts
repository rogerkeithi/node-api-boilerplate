import express from "express";
import { asyncWrapper } from "../config/async-wrapper";
import { container } from "../config/inversify-container";
import LoginController from "../controllers/login-controller";

const loginRoute = express.Router();
const loginController = container.get<LoginController>(LoginController);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: ""
 *               password:
 *                 type: string
 *                 example: ""
 *     responses:
 *       201:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais incorretas
 */
loginRoute.post("/login", asyncWrapper(loginController.execute.bind(loginController)));

export default loginRoute;
