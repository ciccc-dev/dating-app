import { NextFunction, Request, Response } from "express";
import { PhotoUrl } from "./photoUrl";
import { PhotoUrlRepository, url } from "./repository";
import { Prisma } from "@prisma/client";

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
        new PhotoUrl(req.params.profileId, url, index).toHash()
      );

      await PhotoUrlRepository.createPhotoUrls(photos);
      res.status(201).json();
    }
  } catch (err) {
    next(err);
  }
};

export const postPhotoUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.file) {
      const data = await PhotoUrlRepository.postPhotoToBucket(
        req.file as Express.Multer.File
      );

      const { profileId, photoUrl, sortOrder, id, registeredAt, updatedAt } =
        new PhotoUrl(req.params.profileId, data, 1).toHash();

      const photo: Prisma.PhotoUrlCreateInput = {
        id: id,
        profile: { connect: { id: profileId } },
        photoUrl: photoUrl,
        sortOrder: sortOrder,
        registeredAt: registeredAt,
        updatedAt: updatedAt,
      };

      await PhotoUrlRepository.createPhotoUrl(photo);
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

export const fetchPhotoUrlsLikedList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // sentTo
  interface PhotoUrls {
    urLSentTo: url[];
    urLReceivedFrom: url[];
    urLMatched: url[];
  }

  const resultPhotos: PhotoUrls = {
    urLSentTo: [],
    urLReceivedFrom: [],
    urLMatched: [],
  };

  try {
    // sentTo
    const jsonArraySentTo = JSON.parse(req.params.sentTo);
    if (jsonArraySentTo.length > 0) {
      const urls: Promise<url>[] = jsonArraySentTo.map(
        async (item: string) => await PhotoUrlRepository.fetchPhotoUrls(item)
      );
      resultPhotos.urLSentTo = await Promise.all(urls);
    }

    // receivedFrom
    const jsonArrayReceivedFrom = JSON.parse(req.params.receivedFrom);
    if (jsonArrayReceivedFrom.length > 0) {
      const urls: Promise<url>[] = jsonArrayReceivedFrom.map(
        async (item: string) => await PhotoUrlRepository.fetchPhotoUrls(item)
      );
      resultPhotos.urLReceivedFrom = await Promise.all(urls);
    }

    // matched
    const jsonArrayMatched = JSON.parse(req.params.matched);
    if (jsonArrayMatched.length > 0) {
      const urls: Promise<url>[] = jsonArrayMatched.map(
        async (item: string) => await PhotoUrlRepository.fetchPhotoUrls(item)
      );
      resultPhotos.urLMatched = await Promise.all(urls);
    }

    console.log(resultPhotos);
    res.status(201).json(resultPhotos);
  } catch (err) {
    next(err);
  }
};
