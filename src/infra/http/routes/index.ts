import { Router } from "express";

import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { CreateComplimentController } from "../controllers/CreateComplimentController";
import { CreateTagController } from "../controllers/CreateTagController";
import { CreateUserController } from "../controllers/CreateUserController";
import { ListUserReceiveComplimentsController } from "../controllers/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "../controllers/ListUserSendComplimentsController";
import { ListTagsController } from "../controllers/ListTagsController";
import { ListUsersController } from "../controllers/ListUsersController";

import { ensureAdmin } from "../../../helpers/ensureAdmin";
import { ensureAuthenticated } from "../../../helpers/ensureAuthenticated";

const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const createTagController = new CreateTagController();
const createUserController = new CreateUserController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();

const router = Router();

router.get("/", (req, res) =>
  res.status(200).json({ status: "success", message: "API is started!" })
);

router.post("/sessions", authenticateUserController.handle);

router.post("/users", createUserController.handle);

router.get("/users", ensureAuthenticated, listUsersController.handle);

router.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);

router.get("/tags", ensureAuthenticated, listTagsController.handle);

router.post(
  "/compliments",
  ensureAuthenticated,
  createComplimentController.handle
);

router.get(
  "/compliments/receive",
  ensureAuthenticated,
  listUserReceiveComplimentsController.handle
);

router.get(
  "/compliments/send",
  ensureAuthenticated,
  listUserSendComplimentsController.handle
);

export { router };
