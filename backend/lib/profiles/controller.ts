import { NextFunction, Request, Response } from "express";

import { validate } from "../../middleware/validateRequest";
import { Profile } from "./profile";
import { ProfileRepository } from "./repository";
import { FilterRepository } from "../filters";
import { GeolocationRepository } from "../geolocations";
import { Filter } from "../filters/filter";
import { PhotoUrlRepository } from "../photoUrls/repository";

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
    const userId = req.auth?.payload?.sub as string;
    const profile = await ProfileRepository.fetchProfileByUserId(userId);
    if (!profile) res.status(400).json({ error: "Can't find your profile" });

    const filter = await FilterRepository.fetchFilterByProfileId(
      profile?.id ?? ""
    );
    if (!filter) res.status(400).json({ error: "Can't fetch filter" });

    const geolocation = await GeolocationRepository.fetchGeolocation(
      profile?.id ?? ""
    );

    const result = await ProfileRepository.fetchProfilesByFilter(
      userId,
      filter,
      geolocation?.longitude,
      geolocation?.latitude
    );

    if (result) {
      const processedProfiles = await Promise.all(
        result.map(async (profile) => {
          console.log(profile.photos);
          if (profile.photos[0].id) {
            const photoUrls = await PhotoUrlRepository.fetchPhotosFromBucket(
              profile.photos
            );
            return {
              ...profile,
              photos: photoUrls,
            };
          }
          return {
            ...profile,
            photos: [],
          };
        })
      );
      return res.status(200).json(processedProfiles);
    }

    return res.status(200).json(result);
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
    // TODO: Replace prisma schema file on show_me of filter table
    const filter = new Filter({
      showMe: req.body.show_me[0],
      purposes: req.body.purposes,
    });

    console.log(filter);

    const result = await ProfileRepository.createProfile(
      profile,
      filter,
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
