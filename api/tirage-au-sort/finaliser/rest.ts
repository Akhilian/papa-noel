import { Request, Response } from 'express'
import { SMS } from '../notifications/sms'
import { ParticipantSerializer } from '../../gestionnaire/serializer'
import { prisma } from '../../prisma'

function sleep (ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const finaliserTirageAuSort = async (_: Request, res: Response) => {
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

  for (const duo of duos) {
    if (!smsDejaEnvoyé.includes(BigInt(duo.participant.telephone))) {
      try {
        await SMS.envoyer(duo)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
      await sleep(2000)
    }
  }

  return res.status(200).json({})
}
