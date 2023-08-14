import { NextFunction, Request, Response } from "express";

import {
  GeolocationRepository,
  ExterenalGeolocationRepository,
} from "./repository";
import { ProfileGeolocation } from "./geolocation";
import { Prisma } from "@prisma/client";

export const postGeolocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const exterenalGeolocation =
      await ExterenalGeolocationRepository.fetchGeolocationfromExterenalApi(
        req.body.ipaddress
      );

    const { id, profileId, location, latitude, longitude } =
      new ProfileGeolocation(
        req.body.profileId,
        exterenalGeolocation.location,
        exterenalGeolocation.latitude,
        exterenalGeolocation.longitude
      ).toHash();

    const geolocation: Prisma.GeolocationCreateInput = {
      id: id,
      profile: { connect: { id: profileId } },
      location: location,
      latitude: latitude,
      longitude: longitude,
    };
    await GeolocationRepository.createGeolocation(geolocation);
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
    const geolocation =
      await ExterenalGeolocationRepository.fetchGeolocationfromExterenalApi(
        req.body.ipaddress
      );

    await GeolocationRepository.updateGeolocationByProfileId(
      req.body.profileId,
      geolocation
    );
    res.status(201).json();
  } catch (err) {
    next(err);
  }
};

export const getGeolocationDistance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // await GeolocationRepository.fetchGeolocation(
    //   req.body.longitude,
    //   req.body.latitude
    // );
    res.status(201).json();
  } catch (err) {
    next(err);
  }
};
