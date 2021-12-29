import { Request, Response } from 'express'
import { getSession } from '~/api/gestionnaire/repository'

export const inscrireUnParticipant = async (request: Request, res: Response) => {
  const id = Number(request.params.id)

  const session = await getSession(id)

  if (session === undefined) {
    return res.status(404).json({})
  }

  res.status(400).json({
    errors: [
      { title: 'Le champ telephone est obligatoire' },
      { title: 'Le champ prenom est obligatoire' }
    ]
  })
}
