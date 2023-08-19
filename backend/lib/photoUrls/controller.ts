import { NextFunction, Request, Response } from "express";
import { PhotoUrl } from "./photoUrl";
import { PhotoUrlRepository } from "./repository";

interface photoUrl {
  profileId: string;
  photoUrl: string;
  sortOrder: number;
  id: string;
}

export const postPhotoUrls = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.files) {
      const data = await PhotoUrlRepository.postPhotosToBucket(
        req.files as Express.Multer.File[]
      );

      const photos = req.body.map((photo: photoUrl) =>
        new PhotoUrl(
          photo.profileId,
          photo.photoUrl,
          photo.sortOrder,
          photo.id
        ).toHash()
      );

      await PhotoUrlRepository.createPhotoUrls(photos);
      res.status(201).json();
    }
  } catch (err) {
    next(err);
  }
};

export const fetchPhotoUrls = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const urls = await PhotoUrlRepository.fetchPhotoUrls(req.params.profileId);
  const result = await PhotoUrlRepository.fetchPhotosFromBucket(urls);
  console.log(result);
  res.status(201).json(result);
};
