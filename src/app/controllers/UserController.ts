import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User"


class UserController {
  async list(request: Request, response: Response){
    const userRepository = getRepository(User);

    const user = await userRepository.find()

    return response.json({user})
  }
  async create(request: Request, response: Response){
    let { name, email} = request.body
    
    const userRepository = getRepository(User);
    
    const userAlreadyExists = await userRepository.findOne({email});

    if(userAlreadyExists){
      return response.status(400).send({error: 'User already exists!'});
    }

    const user = userRepository.create({
      name, email
    });

    await userRepository.save(user)

    return response.json(user)
  }

}

export { UserController};