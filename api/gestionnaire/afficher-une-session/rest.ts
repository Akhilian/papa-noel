import { Request, Response } from 'express'
import { getSession } from '../repository'
import { SessionSerializer } from '../serializer'

export const afficherUneSession = async (request: Request, res: Response) => {
  const id = request.params.id

  const session = await getSession(Number(id))

  if (!session) {
    return res.status(404).json()
  }

  res.status(200).json({
    id,
    data: SessionSerializer.toRest(session),
    links: {
      self: `/session/${id}`
    }
  })
}
