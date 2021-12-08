import { Famille, Participant } from '../gestionnaire/gestionnaire.entities'

export type Tuple = {
  participant: Participant,
  beneficiaire: Participant,
}

export class Resultat {
  resultat: Array<Tuple>

  constructor (resultat: Array<Tuple>) {
    this.resultat = resultat
  }

  pour (participant: Participant) {
    const tuple = this.resultat.find(tuple => tuple.participant === participant)
    return tuple?.beneficiaire
  }
}

export class TirageAuSort {
  private familles: Array<Famille>
  private shuffle: Function

  constructor (familles: Array<Famille>, shuffle?: Function) {
    if (familles.length < 1) {
      throw new Error('Un tirage ne peut être démarrer sans aucune famille')
    }

    this.familles = familles
    this.shuffle = shuffle || (() => {
    })
  }

  proceder () {
    type Options = {
      participant: Participant,
      famille: Famille,
    }

    const toutesLesParticipants = this.familles.reduce((acc, famille) => {
      famille.participants.forEach((participant) => {
        acc.push({
          famille,
          participant
        })
      })
      return acc
    }, <Options[]>[])

    let toutesLesOptions = this.familles.reduce((acc, famille) => {
      famille.participants.forEach((participant) => {
        acc.push({
          famille,
          participant
        })
      })
      return acc
    }, <Options[]>[])

    this.shuffle(toutesLesOptions)

    const tuples: Array<Tuple> = toutesLesParticipants.map((option) => {
      let optionRetenue = toutesLesOptions.find(possibleOption => possibleOption.famille !== option.famille)

      if (!optionRetenue) {
        optionRetenue = toutesLesOptions.find(possibleOption => possibleOption.participant !== option.participant)
      }

      toutesLesOptions = toutesLesOptions.filter(option => option !== optionRetenue)

      return {
        participant: option.participant,
        beneficiaire: optionRetenue!.participant
      }
    })

    return new Resultat(
      tuples
    )
  }
}
