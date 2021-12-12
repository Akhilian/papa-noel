import { Famille, Participant, SessionId } from '../gestionnaire/gestionnaire.entities'

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
    const tuple = this.resultat.find(tuple => tuple.participant === participant)
    return tuple?.beneficiaire
  }
}

export class TirageAuSort {
  private familles: Array<Famille>
  private shuffle: Function
  private _resultat?: Resultat
  private _estFinalisé: boolean
  sessionId: SessionId

  constructor (sessionId: SessionId, familles: Array<Famille>, shuffle?: Function) {
    this._resultat = undefined
    this._estFinalisé = false
    this.sessionId = sessionId

    if (familles.length < 1) {
      throw new Error('Un tirage ne peut être démarrer sans aucune famille')
    }

    this.familles = familles
    this.shuffle = shuffle || (() => {
    })
  }

  get resultat (): Resultat | undefined {
    return this._resultat
  }

  proceder () {
    if (this._estFinalisé) {
      throw new Error('Impossible de procéder, le tirage au sort a été finalisé.')
    }

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

    const tuples: Array<Duo> = toutesLesParticipants.map((option) => {
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

    const resultat = new Resultat(
      tuples
    )
    this._resultat = resultat

    return resultat
  }

  finaliser () : void {
    this._estFinalisé = true
  }
}
