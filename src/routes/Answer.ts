import { Router } from "express";
import { AnswerController } from "../app/controllers/AnswerController"

const router = Router();

const answerControler = new AnswerController()

router.get("/:value", answerControler.execute)

export  { router }