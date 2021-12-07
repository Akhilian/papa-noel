import { Famille, Participant } from '~/api/tirage-au-sort/entities'

export const FamilleSerializer = {
  fromORM: (famille: any) => {
    const listParticipants = famille.participants.map((participant: any) => {
      return new Participant(participant.name)
    })

    return new Famille(
      famille.name,
      listParticipants
    )
  }
}
