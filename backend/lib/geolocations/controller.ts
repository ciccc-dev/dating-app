import { NextFunction, Request, Response } from "express";

import {
  GeolocationRepository,
  ExterenalGeolocationRepository,
} from "./repository";
import { ProfileGeolocation } from "./geolocation";
import { Prisma } from "@prisma/client";

export const putGeolocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const city = await ExterenalGeolocationRepository.fetchGeolocationfromExApi(
      req.body.coordinate
    );

    const { id, profileId, location, latitude, longitude } =
      new ProfileGeolocation(
        req.body.profileId,
        city,
        req.body.coordinate.latitude,
        req.body.coordinate.longitude
      ).toHash();

    const geolocation: Prisma.GeolocationCreateInput = {
      id: id,
      profile: { connect: { id: profileId } },
      location: location,
      latitude: latitude,
      longitude: longitude,
    };

    await GeolocationRepository.upsertGeolocation(geolocation);
    res.status(201).json();
  } catch (err) {
    next(err);
  }
};

export const updateGeolocationByProfileId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const city = await ExterenalGeolocationRepository.fetchGeolocationfromExApi(
      req.body.coordinate
    );

    const geolocation = {
      latitude: req.body.coordinate.latitude,
      longitude: req.body.coordinate.longitude,
      location: city,
    };
    await GeolocationRepository.updateGeolocationByProfileId(
      req.body.profileId,
      geolocation
    );
    res.status(201).json();
  } catch (err) {
    next(err);
  }
};
