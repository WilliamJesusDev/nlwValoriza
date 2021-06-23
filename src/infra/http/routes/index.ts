import { Router } from "express";

import { CreateTagController } from "../controllers/CreateTagController";
import { CreateUserController } from "../controllers/CreateUserController";

import { ensureAdmin } from "../../../helpers/ensureAdmin";

const createTagController = new CreateTagController();
const createUserController = new CreateUserController();

const router = Router();

router.get("/", (req, res) =>
  res.status(200).json({ status: "success", message: "API is started!" })
);

router.post("/tags", ensureAdmin, createTagController.handle);

router.post("/users", createUserController.handle);

export { router };
