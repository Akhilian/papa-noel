import { TirageAuSort } from '../../../tirage-au-sort/tirageAuSort.entities'
import { melange } from '../../../tirage-au-sort/melange'
import { Famille } from '~/api/gestionnaire/domain/models/famille'
import { Aggregate } from '~/api/ddd-utils/domain/aggregate'

export type SessionId = {
  id: number
}

export class Session extends Aggregate {
  familles: Famille[]
  nom: string
  id: SessionId

  constructor (sessionId: SessionId, nom: string = '', famille: Famille[]) {
    super()
    this.familles = famille
    this.nom = nom
    this.id = sessionId
  }

  initierUnTirageAuSort () {
    return new TirageAuSort(this.id, this.familles, melange)
  }
}
