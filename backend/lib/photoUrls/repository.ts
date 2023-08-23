import { Prisma, PrismaClient } from "@prisma/client";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const bucketName = process.env.BUCKET_NAME!;
const bucketRegion = process.env.BUCKET_REGION!;
const accessKey = process.env.ACCESS_KEY!;
const secretAccessKey = process.env.SECRET_ACCESS_KEY!;

export interface url {
  id: string;
  photoUrl: string;
}

interface photoUrl {
  photoUrl: string;
}

class _PhotoUrlRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }
  postPhotosToBucket = async (files: Express.Multer.File[]) => {
    const s3 = new S3Client({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
      region: bucketRegion,
    });
    const data: string[] = [];

    for (const file of files) {
      const randomImageName = crypto.randomBytes(32).toString("hex");
      const randomUrl = randomImageName + "_" + file.originalname;

      const params = {
        Bucket: bucketName,
        Key: randomUrl,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      data.push(randomUrl);
      const command = new PutObjectCommand(params);
      await s3.send(command);
    }
    return data;
  };

  postPhotoToBucket = async (file: Express.Multer.File) => {
    const s3 = new S3Client({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
      region: bucketRegion,
    });

    const randomImageName = crypto.randomBytes(32).toString("hex");
    const randomUrl = randomImageName + "_" + file.originalname;
    const params = {
      Bucket: bucketName,
      Key: randomUrl,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);

    return randomUrl;
  };

  fetchPhotosFromBucket = async (photoUrls: url[]) => {
    const s3 = new S3Client({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
      region: bucketRegion,
    });
    const updatedPhotoUrls: url[] = [];
    for (const photoUrl of photoUrls) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: photoUrl.photoUrl,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      const updatedPhotoUrl = {
        ...photoUrl,
        photoUrl: url,
      };
      updatedPhotoUrls.push(updatedPhotoUrl);
    }
    return updatedPhotoUrls;
  };

  deletePhotoFromBucket = async (photoUrl: photoUrl) => {
    const s3 = new S3Client({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
      region: bucketRegion,
    });

    const params = {
      Bucket: bucketName,
      Key: photoUrl.photoUrl,
    };

    const command = new DeleteObjectCommand(params);
    const url = await s3.send(command);
    return url;
  };

  createPhotoUrls = async (photoUrls: Prisma.PhotoUrlCreateManyInput[]) => {
    const result = this.db.photoUrl.createMany({
      data: photoUrls,
    });
    return result;
  };

  createPhotoUrl = async (photoUrl: Prisma.PhotoUrlCreateInput) => {
    const result = this.db.photoUrl.create({
      data: photoUrl,
    });
    return result;
  };

  fetchPhotoUrls = async (profileId: string) => {
    const result = await this.db.photoUrl.findMany({
      where: {
        profileId: profileId,
      },
      select: {
        id: true,
        photoUrl: true,
      },
    });
    return result;
  };

  fetchPhotoUrlById = async (id: string) => {
    const result = await this.db.photoUrl.findUnique({
      where: {
        id: id,
      },
      select: {
        photoUrl: true,
      },
    });
    return result;
  };

  deletePhotoUrlById = async (id: string) => {
    const result = await this.db.photoUrl.delete({
      where: {
        id: id,
      },
    });
    return result;
  };

  updatePhotoUrlById = async (id: string, url: string) => {
    const result = await this.db.photoUrl.update({
      where: {
        id: id,
      },
      data: {
        photoUrl: url,
      },
    });
    return result;
  };
}

const db = new PrismaClient();
export const PhotoUrlRepository = new _PhotoUrlRepository(db);
