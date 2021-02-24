import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";


class UserController {
  async index(request: Request, response: Response){
    const userRepository = getCustomRepository(UserRepository);

    const all = await userRepository.find()

    return response.json({all})
  }
  async create(request: Request, response: Response){
    let { name, email} = request.body
    
    const userRepository = getCustomRepository(UserRepository);
    
    const userAlreadyExists = await userRepository.findOne({email});

    if(userAlreadyExists){
      return response.status(400).send({error: 'User already exists!'});
    }

    const user = userRepository.create({
      name, email
    });

    await userRepository.save(user)

    return response.status(201).json(user)
  }

}

export { UserController};