import express from "express";

//This function is capturing and handling asynchronous errors in the routes
export const asyncWrapper = (fn: any) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };