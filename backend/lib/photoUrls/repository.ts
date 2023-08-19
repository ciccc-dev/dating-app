import { Prisma, PrismaClient } from "@prisma/client";
import {
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
const randomImageName = crypto.randomBytes(32).toString("hex");

interface url {
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
      const randomUrl = randomImageName + file.originalname;

      const params = {
        Bucket: bucketName,
        Key: randomUrl,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      data.push(randomUrl);
      console.log("params", params);
      const command = new PutObjectCommand(params);
      await s3.send(command);
    }
    return data;
  };

  fetchPhotosFromBucket = async (photoUrls: url[]) => {
    const s3 = new S3Client({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
      region: bucketRegion,
    });
    const urls: string[] = [];
    for (const photoUrl of photoUrls) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: photoUrl.photoUrl,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      urls.push(url);
    }
    return urls;
  };

  createPhotoUrls = async (photoUrls: Prisma.PhotoUrlCreateManyInput[]) => {
    const result = this.db.photoUrl.createMany({
      data: photoUrls,
    });
    return result;
  };

  fetchPhotoUrls = async (profileId: string) => {
    const result = await this.db.photoUrl.findMany({
      where: {
        profileId: profileId,
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
