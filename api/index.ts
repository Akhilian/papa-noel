const bodyParser = require('body-parser')
import express, { Request, Response } from 'express';
const app = express()

app.use(bodyParser.json())
app.all('/getJSON', (req: Request, res: Response) => {
  res.json({ data: 'data' })
})

module.exports = app
