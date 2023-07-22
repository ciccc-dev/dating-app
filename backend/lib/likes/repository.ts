import { PrismaClient } from "@prisma/client";

class _LikesRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async fetchSentLikesByUserId(userId: string) {
    const likes = await this.db.like.findMany({
      select: { receiver: true, likedAt: true },
      where: { sentBy: userId },
    });
    return likes;
  }

  async fetchReceivedLikesByUserId(userId: string) {
    const likes = await this.db.like.findMany({
      select: { sender: true, likedAt: true },
      where: { receivedBy: userId },
    });
    return likes;
  }

  async fetchMatchedLikesByUserId(userId: string) {
    const userIdsSentLike = await this.db.like
      .findMany({
        select: { receivedBy: true },
        where: { sentBy: userId },
      })
      .then((res) => res.map((res) => res.receivedBy));

    const receivedLikes = await this.db.like.findMany({
      include: { receiver: true },
      where: { receivedBy: userId },
    });

    const matchedLikes = receivedLikes
      .filter((like) => userIdsSentLike.includes(like.sentBy))
      .map((like) => like.receiver);
    return matchedLikes;
  }
}

const db = new PrismaClient();
export const LikeRepository = new _LikesRepository(db);
