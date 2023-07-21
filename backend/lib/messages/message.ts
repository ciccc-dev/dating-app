import crypto from "crypto";

export class Message {
  private id: string;
  private sentBy: string;
  private receivedBy: string;
  private message: string;
  private hasRead: boolean;
  private timestamp: Date;

  constructor(
    sentBy: string,
    receivedBy: string,
    message: string,
    id: string = crypto.randomUUID(),
    hasRead: boolean = false,
    timestamp: Date = new Date()
  ) {
    if (!sentBy) throw new Error("sentBy can't be empty");
    if (!receivedBy) throw new Error("receivedtBy can't be empty");
    if (!message) throw new Error("message can't be empty");

    this.sentBy = sentBy;
    this.receivedBy = receivedBy;
    this.message = message;
    this.id = id;
    this.hasRead = hasRead;
    this.timestamp = timestamp;
  }

  toHash = (): {
    sentBy: string;
    receivedBy: string;
    message: string;
    id: string;
    hasRead: boolean;
    timestamp: Date;
  } => {
    return {
      sentBy: this.sentBy,
      receivedBy: this.receivedBy,
      message: this.message,
      id: this.id,
      hasRead: this.hasRead,
      timestamp: this.timestamp,
    };
  };
}
