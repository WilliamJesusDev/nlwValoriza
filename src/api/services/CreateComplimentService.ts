import { getCustomRepository } from "typeorm";

import { IComplimentRequestDTO } from "../dtos/IComplimentRequestDTO";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";
import { TagsRepository } from "../repositories/TagsRepository";
import { UsersRepository } from "../repositories/UsersRepository";

class CreateComplimentService {
  async execute({
    user_sender,
    user_receiver,
    tag_id,
    message,
  }: IComplimentRequestDTO) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);
    const usersRepository = getCustomRepository(UsersRepository);
    const tagsRepository = getCustomRepository(TagsRepository);

    if (user_sender === user_receiver) {
      throw new Error("Incorrect user receiver!");
    }

    const userReceiverExists = usersRepository.findOne(user_receiver);
    if (!userReceiverExists) {
      throw new Error("User receiver not exists!");
    }

    const tagAlreadyExists = await complimentsRepository.findOne(tag_id);
    if (tagAlreadyExists) {
      throw new Error("Tag not exists!");
    }

    const compliment = complimentsRepository.create({
      user_sender,
      user_receiver,
      tag_id,
      message,
    });

    await complimentsRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
