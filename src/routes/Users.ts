import { Router } from "express";
import { UserController } from "../app/controllers/UserController";

const router = Router();
const userControler = new UserController()

router.get('/', userControler.list)
router.post('/', userControler.create)

export { router }