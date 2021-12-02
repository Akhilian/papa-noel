import { Request, Response, Router } from 'express'
const router = Router()

router.post('/session/1/tirage-au-sort', (_: Request, res: Response) => {
  res.status(204).json({
    data: {}
  })
})

export default router
