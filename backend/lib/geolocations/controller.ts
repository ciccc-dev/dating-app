import axios from "axios";
import { NextFunction, Request, Response } from "express";

import { GeolocationRepository } from "./repository";
import { ProfileGeolocation } from "./geolocation";
import { Prisma } from "@prisma/client";

export const postGeolocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, profileId, location, latitude, longtitude } =
      new ProfileGeolocation(
        req.body.profileId,
        req.body.location,
        req.body.latitude,
        req.body.longtitude
      ).toHash();

    const geolocation: Prisma.GeolocationCreateInput = {
      id: id,
      profile: { connect: { id: profileId } },
      location: location,
      latitude: latitude,
      longtitude: longtitude,
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
    await GeolocationRepository.updateGeolocationByProfileId(
      req.body.profileId,
      req.body.geolocation
    );
    res.status(201).json();
  } catch (err) {
    next(err);
  }
};

export const fetchGeolocationfromExterenal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const apiUrl = process.env.GEOLOCATION_API_URL;
    const apiKey = process.env.GEOLOCATION_API_KEY;
    const ipaddress = req.body.ipaddress;
    const geolocationUrl = `${apiUrl}/${ipaddress}?access_key=${apiKey}`;
    const response = await axios.get(geolocationUrl);
    const geolocationData = response.data;
    return res.json(geolocationData);
    // res.status(201).json();
  } catch (err) {
    next(err);
  }
};
