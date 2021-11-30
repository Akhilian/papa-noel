import express, { Request, Response } from 'express'
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.all('/getJSON', (_: Request, res: Response) => {
  res.json({ data: 'data' })
})

module.exports = app
