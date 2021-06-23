import "reflect-metadata";
import "express-async-errors";
import express, { NextFunction, Response, Request } from "express";

import { router } from "./routes";

import "./database";

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

app.listen(3333, () =>
  console.log("Server is running on http://localhost:3333")
);
