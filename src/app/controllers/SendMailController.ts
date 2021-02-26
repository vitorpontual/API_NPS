import { Request, Response} from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveyRepository";
import { UserRepository } from "../repositories/UserRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository"
import SendMailServices from "../../services/SendMailServices";
import {resolve} from "path";

class SendMailController {
  async execute(request: Request, response: Response){
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UserRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({ email })
    

    if(!user){
      return response.status(400).json({
        error: "User does not exists",
      })
    }

    const survey = await surveysRepository.findOne({ id: survey_id })

    if(!survey){
      return response.status(400).json({
        error: "Survey does not exists"
      })
    }

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: [
        {user_id: user.id}, {value: null}
      ],
      relations: ["user", "survey"]
    })
    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: process.env.URL_MAIL
    }
    
    

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");
    
    if(surveyUserAlreadyExists){
      await SendMailServices.execute(email, survey.title, variables, npsPath)
      return response.status(202).json({surveyUserAlreadyExists})
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id
    });
    
    await surveysUsersRepository.save(surveyUser);
    

    await SendMailServices.execute(email, survey.title, variables, npsPath);

    return response.status(201).json(surveyUser)    
  }
}

export { SendMailController}