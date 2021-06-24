import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { IAuthenticateUserDTO } from "../dtos/IAuthenticateUserRequestDTO";
import { UsersRepository } from "../repositories/UsersRepository";

import { secret } from "../../config/env";

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateUserDTO) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) throw new Error("Incorrect Email/Password");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new Error("Incorrect Email/Password");

    const token = sign({ email: user.email }, secret, {
      subject: user.id,
      expiresIn: "1d",
    });

    return token;
  }
}

export { AuthenticateUserService };
