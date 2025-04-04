import express from "express";
import FindUserController from "../controllers/find-user-controller";
import { container } from "../config/inversify-container";
import { asyncWrapper } from "@rk-org/shared";

const findUserRoute = express.Router();
const findUserController = container.get<FindUserController>(FindUserController);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Find user
 *     description: Find a unique user by ID or email.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         description: User ID.
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: false
 *         description: User email.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
findUserRoute.get("/user", asyncWrapper(findUserController.execute.bind(findUserController)));

export default findUserRoute;
