import { Request, Response } from 'express'
import { SMS } from '../notifications/sms'
import { ParticipantSerializer } from '../../gestionnaire/serializer'
import { recupererTirageAuSort } from '../repository'

function sleep (ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const finaliserTirageAuSort = async (_: Request, res: Response) => {
  const tirageAuSort = await recupererTirageAuSort(Number(_.params.id))

  if (!tirageAuSort) {
    return res.status(404).json()
  }

  const resultatTirageAuSort = tirageAuSort.resultat?.resultat
  const duos = resultatTirageAuSort?.map((duo) => {
    return {
      participant: ParticipantSerializer.fromORM(duo.participant),
      beneficiaire: ParticipantSerializer.fromORM(duo.beneficiaire)
    }
  })

  if (!duos) { return }

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
