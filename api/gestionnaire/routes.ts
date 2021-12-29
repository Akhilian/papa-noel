import { Router } from 'express'
import { afficherUneSession } from './afficher-une-session/rest'

const router = Router()

router.get('/session/:id', afficherUneSession)

export default router
