import { Router } from "express";
import { SendMailController } from "../app/controllers/SendMailController";

const router = Router();
const sendMailController = new SendMailController()

router.post('/', sendMailController.execute)

export { router }