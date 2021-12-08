import { prisma } from '~/api/prisma'
import { FamilleSerializer } from '~/api/gestionnaire/serializer'
import { Famille, Session } from '~/api/gestionnaire/gestionnaire.entities'

export const getSession = async (_: number) : Promise<Session|undefined> => {
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

  return new Session(session.name, familles)
}
export const getFamille: (_: number) => Promise<undefined | Famille> = async (_: number) => {
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
