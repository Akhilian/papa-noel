export class Participant {
  prenom: string;

  constructor (prenom: string) {
    this.prenom = prenom
  }
}

export type Tuple = {
  participant: Participant,
  beneficiaire: Participant,
}

export class Famille {
  nom: string;
  membres: Array<Participant>;

  constructor (nom: string, membres: Array<Participant>) {
    this.nom = nom
    this.membres = membres
  }
}

export class TirageAuSort {
  familles: Array<Famille>;
  shuffle: Function

  constructor (familles: Array<Famille>, shuffle?: Function) {
    this.familles = familles
    this.shuffle = shuffle || (() => {})
  }

  proceder () {
    type Options = {
      membre: Participant,
      famille: Famille,
    }

    const toutesLesParticipants = this.familles.reduce((acc, famille) => {
      famille.membres.forEach((membre) => {
        acc.push({ famille, membre })
      })
      return acc
    }, <Options[]>[])

    let toutesLesOptions = this.familles.reduce((acc, famille) => {
      famille.membres.forEach((membre) => {
        acc.push({ famille, membre })
      })
      return acc
    }, <Options[]>[])

    this.shuffle(toutesLesOptions)

    const tuples : Array<Tuple> = toutesLesParticipants.map((option) => {
      let optionRetenue = toutesLesOptions.find(possibleOption => possibleOption.famille !== option.famille)

      if (!optionRetenue) {
        optionRetenue = toutesLesOptions.find(possibleOption => possibleOption.membre !== option.membre)
      }

      toutesLesOptions = toutesLesOptions.filter(option => option !== optionRetenue)

      return {
        participant: option.membre,
        beneficiaire: optionRetenue!.membre
      }
    })

    return new Resultat(
      tuples
    )
  }
}

export class Resultat {
  resultat: Array<Tuple>;
  constructor (resultat: Array<Tuple>) {
    this.resultat = resultat
  }

  pour (participant: Participant) {
    const tuple = this.resultat.find(tuple => tuple.participant === participant)
    return tuple?.beneficiaire
  }
}
