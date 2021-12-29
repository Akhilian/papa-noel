import { Router } from 'express'
import { afficherUneSession } from './afficher-une-session/rest'
import { inscrireUnParticipant } from '~/api/gestionnaire/inscrire-un-participant/rest'

const router = Router()

router.get('/session/:id', afficherUneSession)
router.post('/session/:id/participant', inscrireUnParticipant)

export default router
