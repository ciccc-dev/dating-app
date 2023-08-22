import { NextFunction, Request, Response } from "express";

import { OpenAiRepository } from "./repository";
import { ProfileRepository } from "../profiles";
import { validate } from "../../middleware/validateRequest";
import { Completion } from "./completion";

export const getAnswersGeneratedByAi = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validate(req);

    const profile = await ProfileRepository.fetchProfileByUserId(
      req.params.userId
    );
    const question = req.query.question as string;

    const completion: Completion =
      await OpenAiRepository.getAnswersGeneratedByAi({
        profile,
        question,
      });
    res.status(200).json({ reply: completion.content() });
  } catch (err) {
    next(err);
  }
};
