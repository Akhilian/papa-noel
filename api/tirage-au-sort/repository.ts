import { Session } from '~/api/tirage-au-sort/entities'
import { prisma } from '~/api/prisma'
import { FamilleSerializer } from '~/api/tirage-au-sort/serializer'

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

  return FamilleSerializer.fromORM(familleTrouvee)
}

export const getSession = async (_: number) => {
  const session = await prisma.session.findUnique({
    where: {
      id: _
    },
    include: {
      familles: {
        include: {
          participants: true
        }
      }
    }
  })

  if (!session) {
    return undefined
  }

  const familles = session.familles.map(FamilleSerializer.fromORM)

  return new Session(familles)
}
