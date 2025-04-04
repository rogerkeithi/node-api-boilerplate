import { Response } from "express";
import { HttpStatus } from "../../enums/http-status-enum";
import { ZodError } from "zod";

export abstract class BaseController {
  protected success<T>(res: Response, data: T, statusCode: number = HttpStatus.OK): Response {
    return res.status(statusCode).json({ success: true, data });
  }

  protected error(res: Response, error: any, statusCode: number = HttpStatus.BAD_REQUEST): Response {
    if (error instanceof ZodError) {
        const errorMessages = error.errors.map(err => err.message);
        return res.status(statusCode).json({
          success: false,
          error: errorMessages[0],
        });
      }

    if (error instanceof Error) {
      return res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(statusCode).json({
      success: false,
      message: "Ocorreu um erro inesperado.",
    });
  }
}