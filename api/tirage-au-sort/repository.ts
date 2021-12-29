import { prisma } from '../prisma'
import { Duo, TirageAuSort } from './tirageAuSort.entities'
import { TirageAuSortSerializer } from '~/api/tirage-au-sort/serializer'

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

export const recupererTirageAuSort = async (id: number) => {
  const tirageAuSort = await prisma.tirageAuSort.findUnique({
    where: {
      id
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
    return null
  }

  return TirageAuSortSerializer.fromORM(tirageAuSort)
}
