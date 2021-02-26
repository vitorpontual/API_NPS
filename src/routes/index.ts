import { Router } from 'express';

import { router as User } from "./Users"
import { router as Survey} from "./Surveys"
import { router as SendMail} from "./SendMail"
import { router as Answer } from "./Answer"
import { router as Nps } from "./Nps"

const router = Router()

router.use('/users', User)
router.use('/surveys', Survey)
router.use("/sendmail", SendMail)
router.use("/answers", Answer)
router.use("/nps", Nps)

export { router }