import { NextFunction, Request, Response } from "express";

import { LikeRepository } from "./repository";

export const getSentLikes = async (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const likes = await LikeRepository.fetchSentLikesByUserId(
      req.params.userId
    );
    res.json({ likes });
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
    const likes = await LikeRepository.fetchReceivedLikesByUserId(
      req.params.userId
    );
    res.json({ likes });
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
    const likes = await LikeRepository.fetchMatchedLikesByUserId(
      req.params.userId
    );
    res.json({ likes });
  } catch (err) {
    next(err);
  }
};
