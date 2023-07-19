class Message {
  private id: string;
  private sentBy: string;
  private receivedBy: string;
  private message: string;
  private hasRead: boolean;
  private timestamp: Date;

  constructor(id, sentBy, receivedBy, message, hasRead, timestamp) {
    this.id = id ?? crypto.randomUUID;

    if (!sentBy) throw new Error("sentBy can't be empty");
    this.sentBy = sentBy;

    if (!receivedBy) throw new Error("receivedtBy can't be empty");
    this.receivedBy = receivedBy;

    if (!message) throw new Error("message can't be empty");
    this.message = message;

    this.hasRead = hasRead ?? false;

    this.timestamp = timestamp ?? new Date();
  }
}
