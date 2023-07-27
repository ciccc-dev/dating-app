import { NextFunction, Request, Response } from "express";

import { MessageRepository } from "./repository";

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const messages = await MessageRepository.fetchMessagesByUserId(
      req.auth?.payload?.sub as string
    );
    const partners = await MessageRepository.fetchPartnersByUserId(
      req.auth?.payload?.sub as string
    );
    res.json({ partners, messages });
  } catch (err) {
    next(err);
  }
};

export const getSpecificMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const messages = await MessageRepository.fetchMessagesBySrcAndRcv(
      req.params.userId as string,
      req.auth?.payload?.sub as string
    );
    res.json({ messages });
  } catch (err) {
    next(err);
  }
};
