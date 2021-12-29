import { Router } from 'express'
import { lancerTirageAuSort } from './lancer/rest'
import { finaliserTirageAuSort } from './finaliser/rest'

const router = Router()

router.post('/session/:id/tirage-au-sort', lancerTirageAuSort)
router.post('/tirage-au-sort/:id/finaliser', finaliserTirageAuSort)

export default router
