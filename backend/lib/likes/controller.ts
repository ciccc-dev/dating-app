import { NextFunction, Request, Response } from "express";

import { LikeRepository } from "./repository";

export const getLikedProfiles = async (
  req: Request<{ auth: any }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.auth?.payload?.sub;
    if (!userId) throw new Error("auth failed");
    const profiles = await LikeRepository.fetchLikeProrilesByUserId(userId);
    res.json(profiles);
  } catch (err) {
    next(err);
  }
};
