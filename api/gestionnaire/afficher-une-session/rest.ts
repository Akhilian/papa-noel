import { Request, Response, Router } from 'express'
import { getSession } from '~/api/gestionnaire/repository'

const router = Router()

router.get('/session/:id', async (request: Request, res: Response) => {
  const id = request.params.id

  const session = await getSession(Number(id))
  /*
    getSession(Number(id)).then((session) => {
      console.log(session)
      const tirageAuSort = session?.initierUnTirageAuSort()
      console.log(tirageAuSort)

      const resultats = tirageAuSort?.proceder()
      console.log(resultats)
      resultats?.resultat.forEach(item => {
        console.log(item)
      })
    })
  */

  if (!session) {
    return res.status(404).json()
  }

  res.status(200).json({
    id,
    nom: session?.nom,
    links: {
      self: `/session/${id}`
    }
  })
})

export default router
