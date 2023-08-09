import { NextFunction, Request, Response } from "express";

import { validate } from "../../middleware/validateRequest";
import { Profile } from "./profile";
import { ProfileRepository } from "./repository";
import { FilterRepository } from "../filters";

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

export const getProfilesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profile = await ProfileRepository.fetchProfileByUserId(
      req.auth?.payload?.sub as string
    );
    if (!profile) res.status(400).json({ error: "Can't find your profile" });

    const filter = await FilterRepository.fetchFilterByProfileId(
      profile?.id ?? ""
    );
    if (!filter) res.status(400).json({ error: "Can't fetch filter" });

    const result = await ProfileRepository.fetchProfilesByFilter(filter);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const postProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validate(req);

    const profile = new Profile({
      ...req.body,
      sexualOrientation: req.body.sexual_orientation,
    });
    const result = await ProfileRepository.createProfile(
      profile,
      req.auth?.payload?.sub as string
    );

    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

export const updateProfileByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ProfileRepository.updateProfileByUserId(
      req.body.data,
      req.body.profile
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};
