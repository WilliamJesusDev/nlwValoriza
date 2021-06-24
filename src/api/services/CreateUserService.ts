import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";

import { IUserRequestDTO } from "../dtos/IUserRequestDTO";
import { UsersRepository } from "../repositories/UsersRepository";

class CreateUserService {
  async execute({ name, email, password, admin = false }: IUserRequestDTO) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new Error("Incorrect email!");
    }

    const userAlreadyExists = await usersRepository.findOne({ email });
    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
      admin,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
