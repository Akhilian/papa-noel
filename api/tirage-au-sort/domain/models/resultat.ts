import { Participant } from '~/api/gestionnaire/domain/models/participant'

export type Duo = {
  participant: Participant,
  beneficiaire: Participant,
}

export class Resultat {
  resultat: Array<Duo>

  constructor (resultat: Array<Duo>) {
    this.resultat = resultat
  }

  pour (participant: Participant) {
    const tuple = this.resultat.find(tuple => tuple.participant.telephone === participant.telephone)
    return tuple?.beneficiaire
  }
}
