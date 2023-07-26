import { PrismaClient } from "@prisma/client";

interface Profile {
  id: string;
  userId: string;
  userName: string;
  birthday: Date;
  gender: string;
  sexualOrientation: string;
  aboutMe: string;
  registeredAt: Date;
  updatedAt: Date;
}

interface SentLike {
  receiver: Profile;
}

interface ReceivedLike {
  sender: Profile;
}

class _LikesRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  fetchLikeProrilesByUserId = async (userId: string) => {
    const sentLikes = await this.db.like.findMany({
      select: { receiver: true, likedAt: true },
      where: { sentBy: userId },
    });
    const receivedLikes = await this.db.like.findMany({
      select: { sender: true, likedAt: true },
      where: { receivedBy: userId },
    });

    const sentTo = this.createProfilesFromSentLikes(sentLikes);
    const receivedFrom = this.createProfilesFromReceivedLikes(receivedLikes);
    const matched = this.createMatchedProfiles(sentTo, receivedFrom);

    return { sentTo, receivedFrom, matched };
  };

  private createProfilesFromSentLikes = (sentLikes: SentLike[]) => {
    const profiles = sentLikes.filter(
      (x, idx, self) =>
        idx === self.findIndex((y) => y.receiver.userId === x.receiver.userId)
    );
    return profiles.map((partner) => partner.receiver);
  };

  private createProfilesFromReceivedLikes = (receivedLikes: ReceivedLike[]) => {
    const profiles = receivedLikes.filter(
      (x, idx, self) =>
        idx === self.findIndex((y) => y.sender.userId === x.sender.userId)
    );
    return profiles.map((partner) => partner.sender);
  };

  private createMatchedProfiles = (
    sentLikeProfiles: Profile[],
    receivedLikeProfiles: Profile[]
  ) => {
    const sentUserIds = sentLikeProfiles.map((x) => x.userId);
    const matchedProfiles = receivedLikeProfiles.filter((x) =>
      sentUserIds.includes(x.userId)
    );
    return matchedProfiles;
  };

  exists = async ({
    sentBy,
    receivedBy,
  }: {
    sentBy: string;
    receivedBy: string;
  }): Promise<boolean> => {
    const count = await this.db.like.count({
      where: { sentBy, receivedBy },
    });
    return count > 0;
  };

  create = async ({
    sentBy,
    receivedBy,
    id,
    likedAt,
  }: {
    sentBy: string;
    receivedBy: string;
    id: string;
    likedAt: Date;
    // }): Promise<boolean> => {
  }) => {
    await this.db.like.create({ data: { sentBy, receivedBy, id, likedAt } });
  };
}

const db = new PrismaClient({
  log: ["query"],
});
export const LikeRepository = new _LikesRepository(db);
