import { NextFunction, Request, Response } from "express";

import { validate } from "../../middleware/validateRequest";
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

export const postMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validate(req);
    await MessageRepository.createMessage({
      sentBy: req.auth?.payload.sub as string,
      receivedBy: req.params.userId as string,
      message: req.body.message,
    });
    // Later:
    // Does the userId exist?
    // Validate message length

    res.status(201).json();
  } catch (err) {
    next(err);
  }
};
