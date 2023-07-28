import { NextFunction, Request, Response } from "express";

import { validate } from "../../middleware/validateRequest";
import { LikeRepository } from "./repository";
import { Like } from "./like";

export const getLikedProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profiles = await LikeRepository.fetchLikeProrilesByUserId(
      req.auth?.payload?.sub as string
    );
    res.json(profiles);
  } catch (err) {
    next(err);
  }
};

export const postLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validate(req);

    const exists = await LikeRepository.exists({
      sentBy: req.auth?.payload?.sub as string,
      receivedBy: req.body.like_to,
    });
    if (exists) throw "You already liked this person";

    const like = new Like(req.auth?.payload?.sub as string, req.body.like_to);
    await LikeRepository.create(like.toHash());
    res.status(201).json();
  } catch (err) {
    next(err);
  }
};
