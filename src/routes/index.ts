import { Router } from 'express';
import { router as User } from "./Users"
import { router as Survey} from "./Surveys"
import { SurveysRepository } from '../app/repositories/SurveyRepository';

const router = Router()

router.use('/users', User)
router.use('/surveys', Survey)




export { router }