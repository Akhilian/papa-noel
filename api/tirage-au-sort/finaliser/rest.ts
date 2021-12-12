import { Request, Response, Router } from 'express'
import { SMS } from '../notifications/sms'
import { ParticipantSerializer } from '../../gestionnaire/serializer'
import { prisma } from '../../prisma'

const router = Router()

function sleep (ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

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

  const SMS_DEJA_ENVOYES = process.env.SMS_DEJA_ENVOYE || ''
  const smsDejaEnvoyé = SMS_DEJA_ENVOYES.split(';').map(i => BigInt(i))

  console.log(smsDejaEnvoyé)

  for (const duo of duos) {
    if (!smsDejaEnvoyé.includes(BigInt(duo.participant.telephone))) {
      try {
        await SMS.envoyer(duo)
        console.log(duo.participant)
      } catch (error) {
        console.error(error)
      }
      await sleep(2000)
    }
  }

  return res.status(200).json({})
})

export default router
