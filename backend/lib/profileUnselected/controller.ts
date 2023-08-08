import { NextFunction, Request, Response } from "express";

import { ProfileUnselectedRepository } from "./repository";
import { ProfileUnselected } from "./profileUnselected";

export const postProfileUnselected = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profiles = req.body.profileIds.map((id: string) =>
      new ProfileUnselected(req.body.profileId, id).toHash()
    );
    await ProfileUnselectedRepository.createProfileUnselected(profiles);
    res.status(201).json();
  } catch (err) {
    next(err);
  }
};
