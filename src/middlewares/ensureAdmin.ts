import { NextFunction, Response, Request } from "express";

export function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const admin = true;

  if (admin) {
    return next();
  }

  return res.status(401).json({ status: "error", error: "Unauthorized" });
}
