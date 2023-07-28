import crypto from "crypto";

export class Like {
  private id: string;
  private sentBy: string;
  private receivedBy: string;
  private likedAt: Date;

  constructor(
    sentBy: string,
    receivedBy: string,
    id: string = crypto.randomUUID(),
    likedAt: Date = new Date()
  ) {
    this.id = id;
    this.sentBy = sentBy;
    this.receivedBy = receivedBy;
    this.likedAt = likedAt;
  }

  toHash = () => ({
    id: this.id,
    sentBy: this.sentBy,
    receivedBy: this.receivedBy,
    likedAt: this.likedAt,
  });
}
