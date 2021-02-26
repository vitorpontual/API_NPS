import { Router } from "express";

import { NpsController } from "../app/controllers/NpsController"

const router = Router();

const npsController = new NpsController();

router.get('/:survey_id', npsController.execute)

export { router }