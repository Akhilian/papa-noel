import { TirageAuSort } from '../tirage-au-sort/tirageAuSort.entities'
import { melange } from '../tirage-au-sort/melange'

export class Participant {
  prenom: string
  telephone: number

  constructor (prenom: string, telephone: number) {
    this.prenom = prenom
    this.telephone = telephone
  }
}

export class Famille {
  nom: string
  participants: Array<Participant>

  constructor (nom: string, participants: Array<Participant>) {
    this.nom = nom
    this.participants = participants
  }
}

export type SessionId = {
  id: number
}

export class Session {
  familles: Famille[]
  nom: string
  id: SessionId

  constructor (sessionId: SessionId, nom: string = '', famille: Famille[]) {
    this.familles = famille
    this.nom = nom
    this.id = sessionId
  }

  initierUnTirageAuSort () {
    return new TirageAuSort(this.id, this.familles, melange)
  }
}
