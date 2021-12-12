import { Request, Response, Router } from 'express'
import { SMS } from '../notifications/sms'
import { ParticipantSerializer } from '../../gestionnaire/serializer'
import { prisma } from '../../prisma'

const router = Router()

router.post('/tirage-au-sort/:id/finaliser', async (_: Request, res: Response) => {
  // FIXME: Migrer vers le repository
  const tirageAuSort = await prisma.tirageAuSort.findUnique({
    where: {
      id: Number(_.params.id)
    },
    include: {
      duos: {
        include: {
          participant: true,
          beneficiaire: true
        }
      }
    }
  })

  if (!tirageAuSort) {
    return res.status(404).json()
  }

  const duos = tirageAuSort?.duos.map((duo) => {
    return {
      participant: ParticipantSerializer.fromORM(duo.participant),
      beneficiaire: ParticipantSerializer.fromORM(duo.beneficiaire)
    }
  })

  for (const duo of duos) {
    try {
      await SMS.envoyer(duo)
    } catch (error) {
      console.error(error)
    }
  }

  return res.status(200).json({})
})

export default router
