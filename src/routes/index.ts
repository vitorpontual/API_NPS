import { Router } from 'express';
import { router as User } from "./Users"
import { router as Survey} from "./Surveys"
import { router as SendMail} from "./SendMail"
import { SurveysRepository } from '../app/repositories/SurveyRepository';

const router = Router()

router.use('/users', User)
router.use('/surveys', Survey)
router.use("/sendmail", SendMail)

export { router }