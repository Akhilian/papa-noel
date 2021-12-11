import { prisma } from '../prisma'
import { Duo, TirageAuSort } from './tirageAuSort.entities'

export const sauvegarderTirageAuSort = async (tirageAuSort: TirageAuSort) => {
  const resultat = tirageAuSort.resultat

  const listDesDuos = resultat?.resultat?.map((duo: Duo) => {
    return {
      participantId: duo.participant.telephone,
      beneficiaireId: duo.beneficiaire.telephone
    }
  })

  await prisma.tirageAuSort.create({
    data: {
      sessionId: tirageAuSort.sessionId.id,
      duos: {
        create: listDesDuos
      }
    }
  })
  return null
}
