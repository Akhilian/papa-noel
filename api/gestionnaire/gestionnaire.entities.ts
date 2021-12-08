import { TirageAuSort } from '../tirage-au-sort/tirageAuSort.entities'

export class Participant {
  prenom: string
  telephone: string

  constructor (prenom: string, telephone = '') {
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

export class Session {
  familles: Famille[]
  nom: string

  constructor (nom: string = '', famille: Famille[]) {
    this.familles = famille
    this.nom = nom
  }

  initierUnTirageAuSort () {
    return new TirageAuSort(this.familles)
  }
}
