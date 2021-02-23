import { Router } from "express";
import { UserController } from "./app/controllers/UserController";

const router = Router();
const userControler = new UserController()

router.get('/users', userControler.list)
router.post('/users', userControler.create)

export { router}