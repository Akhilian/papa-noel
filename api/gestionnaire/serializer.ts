import { Famille, Participant, Session } from './gestionnaire.entities'

const anonymiserNumeroDeTelephone = (numero: number): string => {
  return String(numero).replace(/^(\d{8})/, '********')
}

export const FamilleSerializer = {
  fromORM: (famille: any): Famille => {
    const listParticipants = famille.participants.map((participant: any) => {
      return new Participant(participant.prenom, participant.telephone)
    })

    return new Famille(
      famille.name,
      listParticipants
    )
  },
  toRest: (famille: Famille) => {
    return {
      nom: famille.nom,
      participants: famille.participants.map(ParticipantSerializer.toRest)
    }
  }
}

export const ParticipantSerializer = {
  toRest: (participant: Participant) => {
    return {
      prenom: participant.prenom,
      telephone: anonymiserNumeroDeTelephone(participant.telephone)
    }
  },

  fromORM (participant: any) : Participant {
    return new Participant(
      participant.prenom,
      Number(participant.telephone)
    )
  },

  fromRest ({ prenom, telephone }: any) : Participant {
    return new Participant(prenom, Number(telephone))
  }
}

export const SessionSerializer = {
  toRest: (session: Session) => {
    const familles = session.familles.map(FamilleSerializer.toRest)

    return {
      nom: session.nom,
      familles
    }
  }
}
