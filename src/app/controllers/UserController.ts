import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import * as yup from "yup";
import { AppError } from "../errors/AppError";


class UserController {
  async index(request: Request, response: Response){
    const userRepository = getCustomRepository(UserRepository);

    const all = await userRepository.find()

    return response.json({all})
  }
  async create(request: Request, response: Response){
    let { name, email} = request.body

    const schema = yup.object().shape({
      name: yup.string().required("Name Required"),
      email: yup.string().email().required("Email Required")
    })
    try{
      await schema.validate(request.body, { abortEarly: false})
    }catch(err){
      throw new AppError(err)
    }
    
    const userRepository = getCustomRepository(UserRepository);
    
    const userAlreadyExists = await userRepository.findOne({email});

    if(userAlreadyExists){
      throw new AppError("User already exists!")
    }

    const user = userRepository.create({
      name, email
    });

    await userRepository.save(user)

    return response.status(201).json(user)
  }

}

export { UserController};