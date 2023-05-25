import { NextFunction, Request, Response } from "express";

import { errorHandler } from "./errors";
import { isDevEnvironment } from "./helpers";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  errorHandler.handleError(err);
  return res.status(500).json({
    message: isDevEnvironment()
      ? JSON.stringify(err.message) || "Internal Server Error"
      : "Internal Server Error",
  });
};
