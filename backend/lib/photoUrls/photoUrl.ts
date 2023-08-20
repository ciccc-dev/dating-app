import crypto from "crypto";

export class PhotoUrl {
  private profileId: string;
  private photoUrl: string;
  private sortOrder: number;
  private id: string;
  private registeredAt: Date;
  private updatedAt: Date;

  constructor(
    profileId: string,
    photoUrl: string,
    sortOrder: number,
    id: string = crypto.randomUUID(),
    registeredAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.profileId = profileId;
    this.photoUrl = photoUrl;
    this.sortOrder = sortOrder;
    this.id = id;
    this.registeredAt = registeredAt;
    this.updatedAt = updatedAt;
  }

  toHash = () => ({
    profileId: this.profileId,
    photoUrl: this.photoUrl,
    sortOrder: this.sortOrder,
    id: this.id,
    registeredAt: this.registeredAt,
    updatedAt: this.updatedAt,
  });
}
