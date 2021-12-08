import { Famille, Participant } from '~/api/gestionnaire/gestionnaire.entities'

export const FamilleSerializer = {
  fromORM: (famille: any) : Famille => {
    const listParticipants = famille.participants.map((participant: any) => {
      return new Participant(participant.name)
    })

    return new Famille(
      famille.name,
      listParticipants
    )
  }
}
