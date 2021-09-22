const express = require('express')
// const Knex = require('knex')
const cors = require('cors')
const helmet = require('helmet')
const request = require("request");
// const { Model } = require('objection')
// const knexConfig = require('../../knexfile')

const app = express()
// imported routes

// let knex = {}
// if (process.env.NODE_ENV !== 'production') {
//   knex = Knex(knexConfig.development)
// } else {
//   knex = Knex(knexConfig.production)
// }

// Model.knex(knex)

app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Connected to the index of the route folder!' })
})

app.get('/image', (req, res) => {
  console.log({reqBody: req.body})
  console.log({reqLink: req.imgLink})
  res
    .status(200)
    .json({ message: 'Connected to the image of the route folder!' })
  request.get(req.imgLink).on('error', (error) => { return error }).pipe(res)
})

app.post('/fetch-image', (req, res) => {
  const data = JSON.parse(req.query['0'])

  request.get(data.imgLink).on('error', (error) => { return error }).pipe(res)
})

module.exports = app
