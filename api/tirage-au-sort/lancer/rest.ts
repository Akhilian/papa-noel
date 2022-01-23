import { Request, Response } from 'express'
import { GestionnaireRepository } from '../../gestionnaire/repository'
import { TirageAuSortRepository } from '../repository'
import { TirageAuSortSerializer } from '../serializer'

export const lancerTirageAuSort = async (request: Request, res: Response) => {
  const id = request.params.id
  const session = await new GestionnaireRepository().getSession(Number(id))

  if (!session) {
    return res.status(404).json()
  }

  const tirageAuSort = session.initierUnTirageAuSort()
  tirageAuSort.proceder()

  await new TirageAuSortRepository().sauvegarderTirageAuSort(tirageAuSort)

  res.status(200).json({
    data: TirageAuSortSerializer.toRest(tirageAuSort),
    links: {
      session: `/session/${tirageAuSort.sessionId.id}`
    }
  })
}
