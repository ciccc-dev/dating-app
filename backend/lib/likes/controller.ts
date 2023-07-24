import { NextFunction, Request, Response } from "express";

import { LikeRepository } from "./repository";

export const getSentLikes = async (
  req: Request<{ auth: any }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.auth?.payload?.sub;
    if (!userId) throw new Error("auth failed");
    const profiles = await LikeRepository.fetchSentLikesByUserId(userId);
    res.json({ profiles });
  } catch (err) {
    next(err);
  }
};

export const getReceivedLikes = async (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const plofiles = await LikeRepository.fetchReceivedLikesByUserId(
      req.params.userId
    );
    res.json({ plofiles });
  } catch (err) {
    next(err);
  }
};

export const getMatchedLikes = async (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const plofiles = await LikeRepository.fetchMatchedLikesByUserId(
      req.params.userId
    );
    res.json({ plofiles });
  } catch (err) {
    next(err);
  }
};
