import express from 'express'
import tirageAuSortRouter from './tirage-au-sort/routes'
import gestionnaireRouter from './gestionnaire/routes'
const bodyParser = require('body-parser')
const api = express()

api.use(bodyParser.json())

api.use('/', tirageAuSortRouter)
api.use('/', gestionnaireRouter)

export default api
