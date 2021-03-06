import { TirageAuSort } from './domain/models/tirageAuSort'
import { ParticipantSerializer } from '~/api/gestionnaire/serializer'
import { Famille } from '~/api/gestionnaire/domain/models/famille'
import { Duo, Resultat } from '~/api/tirage-au-sort/domain/models/resultat'

export const TirageAuSortSerializer = {
  toRest: (tirageAuSort: TirageAuSort) => {
    let resultat: Object[] = []
    if (tirageAuSort.resultat) {
      resultat = tirageAuSort.resultat?.resultat.map((duo: Duo) => {
        return {
          participant: duo.participant.prenom,
          bénéficiaire: duo.beneficiaire.prenom
        }
      })
    }

    return {
      resultat
    }
  },

  fromORM: (tirageAuSort: any) => {
    const duos = tirageAuSort.duos.map((duo: Duo) => {
      return {
        participant: ParticipantSerializer.fromORM(duo.participant),
        beneficiaire: ParticipantSerializer.fromORM(duo.beneficiaire)
      }
    })

    return new TirageAuSort(
      { id: tirageAuSort.sessionId },
      [new Famille('', [])],
      () => {
      },
      new Resultat(duos)
    )
  }
}
