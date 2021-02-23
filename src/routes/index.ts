import { Router } from 'express';
import { router as User } from "./Users"

const router = Router()

router.use('/users', User)




export { router }