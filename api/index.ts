import express, { Request, Response } from 'express'
import lancerTirageAuSortRouter from './tirage-au-sort/lancer/rest'
import finaliserUnTirageAuSortRouter from './tirage-au-sort/finaliser/rest'
import gestionnaireRouter from './gestionnaire/afficher-une-session/rest'
const bodyParser = require('body-parser')
const api = express()

api.use(bodyParser.json())

api.use('/', lancerTirageAuSortRouter)
api.use('/', finaliserUnTirageAuSortRouter)
api.use('/', gestionnaireRouter)

api.get('/resultat/adrien', (_: Request, res: Response) => {
  res.json({
    data: {
      beneficiaire: 'Adrien'
    }
  })
})

api.all('/getJSON', (_: Request, res: Response) => {
  res.json({ data: 'data' })
})

export default api
