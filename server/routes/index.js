const express = require('express')
// const Knex = require('knex')
const cors = require('cors')
const helmet = require('helmet')
const request = require("request")
const axios = require('axios')
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
  res
    .status(200)
    .json({ message: 'Connected to the image of the route folder!' })
  request.get(req.imgLink).on('error', (error) => { return error }).pipe(res)
})

app.post('/fetch-image', (req, res) => {
  const data = JSON.parse(req.query['0'])

  request.get(data.imgLink).on('error', (error) => { return error }).pipe(res)
})

app.post('/ugly', (req, res) => {
  const data = JSON.parse(req.query['0'])
  const options = {
    method: 'GET',
    url: data.imgLink,
    responseType: 'blob'
  }
  axios.request(options).then((response) => {
    console.log(response)
    console.log('it was an error but not')
    res.status(200).json({data: response})
  }).catch((error) => {
    console.log("JK THERE  IS A NERRRER")
    console.log(error)
    res.status(500).json(error)
  })
})

module.exports = app
