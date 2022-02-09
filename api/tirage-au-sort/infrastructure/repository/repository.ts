import { prisma } from '../../../prisma'
import { TirageAuSort } from '../../domain/models/tirageAuSort'
import { TirageAuSortSerializer } from '~/api/tirage-au-sort/serializer'
import { Duo } from '~/api/tirage-au-sort/domain/models/resultat'
import { InterfaceTirageAuSortRepository } from '~/api/tirage-au-sort/domain/repository'

export class TirageAuSortRepository implements InterfaceTirageAuSortRepository {
  async sauvegarderTirageAuSort (tirageAuSort: TirageAuSort): Promise<null> {
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

  async recupererTirageAuSort (id: number) {
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
}
