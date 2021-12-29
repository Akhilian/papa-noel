import { Duo, Resultat, TirageAuSort } from './tirageAuSort.entities'
import { Famille } from '~/api/gestionnaire/gestionnaire.entities'
import { ParticipantSerializer } from '~/api/gestionnaire/serializer'

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
