import { Request, Response } from 'express'
import { getSession } from '~/api/gestionnaire/repository'
import { ParticipantSerializer } from '~/api/gestionnaire/serializer'

export const inscrireUnParticipant = async (request: Request, res: Response) => {
  const id = Number(request.params.id)

  const session = await getSession(id)

  if (session === undefined) {
    return res.status(404).json({})
  }

  const telephone = request.body.telephone
  const prenom = request.body.prenom

  try {
    ParticipantSerializer.fromRest({
      prenom,
      telephone
    })
  } catch (error) {
    res.status(400).json({
      errors: [
        { title: error.message }
      ]
    })
  }
}
