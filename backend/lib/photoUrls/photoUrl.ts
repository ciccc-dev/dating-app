import crypto from "crypto";

export class PhotoUrl {
  private profileId: string;
  private photoUrl: string;
  private sortOrder: number;
  private id: string;

  constructor(
    profileId: string,
    photoUrl: string,
    sortOrder: number,
    id: string = crypto.randomUUID()
  ) {
    this.profileId = profileId;
    this.photoUrl = photoUrl;
    this.sortOrder = sortOrder;
    this.id = id;
  }

  toHash = () => ({
    profileId: this.profileId,
    photoUrl: this.photoUrl,
    sortOrder: this.sortOrder,
    id: this.id,
  });
}
