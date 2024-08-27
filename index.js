const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const yaml = require('js-yaml')

const db = require('./db')
const handle = require('./handle')

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :remote-addr'))

app.get('/getAll', async (req, res) => handle(req, res, db.getAll))
app.get('/get/:key', async (req, res) => handle(req, res, db.get))
app.post('/set', async (req, res) => handle(req, res, db.set))
app.post('/clear', async (req, res) => handle(req, res, db.clear))
app.delete('/delete/:key', async (req, res) => handle(req, res, db.delete))
app.get('/keys', async (req, res) => handle(req, res, db.getKeys))
app.post('/increment/:key', async (req, res) => handle(req, res, db.increment))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`)
})