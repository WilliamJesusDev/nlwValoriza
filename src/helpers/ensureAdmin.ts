import { getCustomRepository } from "typeorm";
import { NextFunction, Response, Request } from "express";

import { UsersRepository } from "../api/repositories/UsersRepository";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const usersRepository = getCustomRepository(UsersRepository);

  const { admin } = await usersRepository.findOne(req.user_id);

  return admin
    ? next()
    : res.status(401).json({ status: 401, error: "Unauthorized" });
}
