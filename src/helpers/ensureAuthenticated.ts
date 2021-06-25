import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { secret } from "../config/env";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const [, token] = req.headers.authorization.split(" ");

  if (!token) return res.status(401).end();

  try {
    const { sub } = verify(token, secret) as IPayload;
    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}
