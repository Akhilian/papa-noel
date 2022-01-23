import { prisma } from '../prisma'
import { FamilleSerializer } from './serializer'
import { Famille, Session } from './gestionnaire.entities'

abstract class InterfaceGestionnaireRepository {
  abstract getSession (id: number) : Promise<Session | undefined>
  abstract getFamille: (_: number) => Promise<undefined | Famille>
}

export class GestionnaireRepository implements InterfaceGestionnaireRepository {
  async getSession (id: number): Promise<Session | undefined> {
    const session = await prisma.session.findUnique({
      where: {
        id
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

    return new Session({ id: session.id }, session.name, familles)
  }

  getFamille: (_: number) => Promise<undefined | Famille> = async (_: number) => {
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
}
