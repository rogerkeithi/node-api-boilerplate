import express from "express";
import { container } from "../config/inversify-container";
import LoginController from "../controllers/login-controller";
import { asyncWrapper } from "@rk-org/shared";

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
 *         description: Logged in successfully
 *       401:
 *         description: Incorrect credentials
 */
loginRoute.post("/login", asyncWrapper(loginController.execute.bind(loginController)));

export default loginRoute;
