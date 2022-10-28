import { Request, Response, NextFunction } from "express";
import { CustomErrorHandler } from "../errors/CustomErrorHandler";

export const errorHandler = (
  err: CustomErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status).json(err.getErrorInfo());
};
