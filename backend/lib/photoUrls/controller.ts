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

      const photos = data.map((url: string, index) =>
        new PhotoUrl(req.body.profileId, url, index).toHash()
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

export const updatePhotoUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await PhotoUrlRepository.updatePhotoUrlById(
    req.params.photoUrlId,
    ""
  );
  res.status(201).json(result);
};

export const deletePhotoUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.params.photoUrlId);
  const url = await PhotoUrlRepository.fetchPhotoUrlById(req.params.photoUrlId);
  if (!url) {
    res.status(404).send("Post not found");
    return;
  }
  await PhotoUrlRepository.deletePhotoFromBucket(url);
  const result = await PhotoUrlRepository.deletePhotoUrlById(
    req.params.photoUrlId
  );
  res.status(201).json(result);
};
