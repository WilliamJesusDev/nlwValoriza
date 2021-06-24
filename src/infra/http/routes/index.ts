import { Router } from "express";

import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { CreateComplimentController } from "../controllers/CreateComplimentController";
import { CreateTagController } from "../controllers/CreateTagController";
import { CreateUserController } from "../controllers/CreateUserController";

import { ensureAdmin } from "../../../helpers/ensureAdmin";

const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const createTagController = new CreateTagController();
const createUserController = new CreateUserController();

const router = Router();

router.get("/", (req, res) =>
  res.status(200).json({ status: "success", message: "API is started!" })
);

router.post("/sessions", authenticateUserController.handle);

router.post("/users", createUserController.handle);

router.post("/tags", ensureAdmin, createTagController.handle);

router.post("/compliments", ensureAdmin, createComplimentController.handle);

export { router };
