import { Participant } from '~/api/gestionnaire/domain/models/participant'
import { Aggregate } from '~/api/ddd-utils/domain/aggregate'

export class Famille extends Aggregate {
  nom: string
  participants: Array<Participant>

  constructor (nom: string, participants: Array<Participant>) {
    super()
    this.nom = nom
    this.participants = participants
  }
}
