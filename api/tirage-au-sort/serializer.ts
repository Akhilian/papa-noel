import { Duo, TirageAuSort } from './tirageAuSort.entities'

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
  }
}
