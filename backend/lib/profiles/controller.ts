import { NextFunction, Request, Response } from "express";

import { ProfileRepository } from "./repository";

export const getProfileByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ProfileRepository.fetchProfileByUserId(
      req.params.userId as string
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};
