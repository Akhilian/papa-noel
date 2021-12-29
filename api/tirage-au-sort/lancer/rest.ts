import { Request, Response } from 'express'
import { getSession } from '../../gestionnaire/repository'
import { sauvegarderTirageAuSort } from '../repository'
import { TirageAuSortSerializer } from '../serializer'

export const lancerTirageAuSort = async (request: Request, res: Response) => {
  const id = request.params.id
  const session = await getSession(Number(id))

  if (!session) {
    return res.status(404).json()
  }

  const tirageAuSort = session.initierUnTirageAuSort()
  tirageAuSort.proceder()

  await sauvegarderTirageAuSort(tirageAuSort)

  res.status(200).json({
    data: TirageAuSortSerializer.toRest(tirageAuSort),
    links: {
      session: `/session/${tirageAuSort.sessionId.id}`
    }
  })
}
