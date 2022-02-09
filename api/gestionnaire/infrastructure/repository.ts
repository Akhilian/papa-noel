import { prisma } from '../../prisma'
import { FamilleSerializer } from '../serializer'
import { Session } from '../domain/models/session'
import { InterfaceGestionnaireRepository } from '~/api/gestionnaire/domain/repository'
import { Famille } from '~/api/gestionnaire/domain/models/famille'

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
