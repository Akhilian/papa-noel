import express, { Request, Response } from 'express'
import router from './tirage-au-sort/lancer/rest'
const bodyParser = require('body-parser')
const api = express()

api.use(bodyParser.json())

api.use('/', router)

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
