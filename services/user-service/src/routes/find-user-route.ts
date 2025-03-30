import express from "express";
import { asyncWrapper } from "../config/async-wrapper";
import { container } from "../config/inversify-container";
import FindUserController from "../controllers/find-user-controller";

const findUserRoute = express.Router();
const findUserController = container.get<FindUserController>(FindUserController);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Buscar usuário
 *     description: Busca um usuário pelo ID ou e-mail.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         description: ID do usuário.
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: false
 *         description: E-mail do usuário.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
findUserRoute.get("/user", asyncWrapper(findUserController.execute.bind(findUserController)));

export default findUserRoute;
