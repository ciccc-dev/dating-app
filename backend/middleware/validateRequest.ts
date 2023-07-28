import { Request } from "express";
import { validationResult } from "express-validator";

export const validate = (req: Request) => {
  if (!validationResult(req).isEmpty()) throw "Request Body is invalid";
};
