import express from "express";

//Essa função está capturando e tratando erros assíncronos nas rotas
export const asyncWrapper = (fn: any) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };