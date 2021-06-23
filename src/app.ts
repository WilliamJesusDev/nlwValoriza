import "reflect-metadata";
import "express-async-errors";
import express, { NextFunction, Response, Request } from "express";

import { router } from "./infra/http/routes";

const app = express();

app.use(express.json());
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ status: "error", error: err.message });
  }

  return res
    .status(500)
    .json({ status: "error", error: "internal server error" });
});

export { app };
