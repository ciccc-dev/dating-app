import { PrismaClient } from "@prisma/client";

import { Message } from "./message";

class _MessageRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  fetchPartnersByUserId = async (userId: string) => {
    const messages = await this.db.chat.findMany({
      include: { sender: true, receiver: true },
      where: { OR: [{ sentBy: userId }, { receivedBy: userId }] },
      orderBy: { timestamp: "asc" },
    });
    let partners = messages.map((message) =>
      message.sentBy === userId ? message.receiver : message.sender
    );
    // Remove duplicated partners
    partners = partners.filter((partner, index, self) => {
      return index === self.findIndex((p) => p.id === partner.id);
    });
    return partners;
  };

  fetchMessagesByUserId = async (userId: string) => {
    const messages = await this.db.chat.findMany({
      include: { sender: true, receiver: true },
      where: { OR: [{ sentBy: userId }, { receivedBy: userId }] },
      orderBy: { timestamp: "asc" },
    });
    return messages;
  };

  createMessage = async ({
    message,
    sentBy,
    receivedBy,
  }: {
    message: string;
    sentBy: string;
    receivedBy: string;
  }): Promise<void> => {
    const messageEntity = new Message(sentBy, receivedBy, message);
    await this.db.chat.create({ data: messageEntity.toHash() });
  };
}

const db = new PrismaClient();
export const MessageRepository = new _MessageRepository(db);
