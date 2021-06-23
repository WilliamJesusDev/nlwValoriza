import { getCustomRepository } from "typeorm";

import { IUserRequestDTO } from "../dtos/IUserRequestDTO";
import { UsersRepository } from "../repositories/UsersRepository";

class CreateUserService {
  async execute({ name, email, admin }: IUserRequestDTO) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new Error("Incorrect email!");
    }

    const userAlreadyExists = await usersRepository.findOne({ email });
    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const user = usersRepository.create({
      name,
      email,
      admin,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
