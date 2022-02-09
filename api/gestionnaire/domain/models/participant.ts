import { Entity } from '~/api/ddd-utils/domain/entity'

// eslint-disable-next-line no-use-before-define
export class Participant implements Entity<Participant> {
  prenom: string
  telephone: number

  constructor (prenom: string, telephone: number) {
    this.prenom = prenom
    this.telephone = telephone

    this.validate()
  }

  private validate () {
    if (!this.prenom) {
      throw new Error('Le champ prénom est obligatoire')
    }

    const formatTelephoneValide = /^33\d{9}$/

    if (!this.telephone || !formatTelephoneValide.test(String(this.telephone))) {
      throw new Error('Le champ téléphone est obligatoire et doit être valide')
    }
  }

  estIdentiqueA (entite: Participant): boolean {
    return entite.prenom === this.prenom && entite.telephone === this.telephone
  }
}
