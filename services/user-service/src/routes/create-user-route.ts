import express from "express";
import CreateUserController from "../controllers/create-user-controller";
import { container } from "../config/inversify-container";
import { asyncWrapper } from "@rk-org/shared";

const createUserRoute = express.Router();
const createUserController = container.get<CreateUserController>(CreateUserController);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "User Name"
 *               email:
 *                 type: string
 *                 example: "email.email@email.com"
 *               role:
 *                 type: string
 *                 enum:
 *                   - "USER"
 *                   - "ADMIN"
 *                   - "MODERATOR"
 *                 example: "USER"
 *               password:
 *                 type: string
 *                 example: ""
 *     responses:
 *       201:
 *         description: Create a new user
 *       400:
 *         description: Invalid user informations
 *       500:
 *         description: Internal server error
 */
createUserRoute.post("/user", asyncWrapper(createUserController.execute.bind(createUserController)));

export default createUserRoute;
