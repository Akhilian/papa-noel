import { Request, Response, Router } from 'express'
import { getSession } from '../../gestionnaire/repository'
import { sauvegarderTirageAuSort } from '../repository'

const router = Router()

router.post('/session/:id/tirage-au-sort', async (request: Request, res: Response) => {
  const id = request.params.id
  const session = await getSession(Number(id))

  if (!session) {
    return res.status(404).json()
  }

  const tirageAuSort = session.initierUnTirageAuSort()
  tirageAuSort.proceder()

  await sauvegarderTirageAuSort(tirageAuSort)

  res.status(200).json({
    data: {}
  })
})

export default router
