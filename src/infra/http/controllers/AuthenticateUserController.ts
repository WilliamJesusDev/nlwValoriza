import { Request, Response } from "express";

import { AuthenticateUserService } from "../../../api/services/AuthenticateUserService";

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const token = await authenticateUserService.execute({ email, password });

    return res.status(202).send({ token });
  }
}

export { AuthenticateUserController };
