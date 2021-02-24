import { Router } from "express";
import { SurveysController } from "../app/controllers/SurveyController";

const router = Router();
const surveyController = new SurveysController()

router.get('/', surveyController.index)
router.post('/', surveyController.create)

export { router }