import { Famille, Participant } from '~/api/tirage-au-sort/entities'
import { prisma } from '~/api/prisma'

export const getFamille = async (_: number) => {
  const familleTrouvee = await prisma.famille.findUnique({
    where: {
      id: _
    },
    include: {
      participants: true
    }
  })
  if (!familleTrouvee) {
    return undefined
  }

  const listMembres = familleTrouvee.participants.map((participant) => {
    return new Participant(participant.name)
  })

  return new Famille(
    familleTrouvee.name,
    listMembres
  )
}
