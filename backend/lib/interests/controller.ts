import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { validate } from "../../middleware/validateRequest";

export const getInterests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const names = req.query.name as string[];
    const client = new PrismaClient();
    const result = await client.interest.findMany({
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true },
      where: { ...(names?.length > 0 ? { name: { in: names } } : {}) },
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
