import { Request, Response} from 'express';
import { CustomRepositoryCannotInheritRepositoryError, getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveyRepository';

class SurveysController{
  async index(request: Request, response: Response){
    const surveyRepository = getCustomRepository(SurveysRepository)

    const all = await surveyRepository.find()

    return response.json(all)
  }

  async create(request: Request, response: Response){
    const { title, description } = request.body

    const surveysRespository = getCustomRepository(SurveysRepository) 

    const survey = surveysRespository.create({
      title,
      description
    });

    await surveysRespository.save(survey)

    return response.status(201).json(survey)
  }

}

export { SurveysController }