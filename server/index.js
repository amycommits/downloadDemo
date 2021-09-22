const express = require('express')
const session = require('express-session') // login persistance
const consola = require('consola')

const { Nuxt, Builder } = require('nuxt')
const app = express()

// homemade cron scheduler
// const cron = require('node-cron')
const config = require('../nuxt.config.js')
// const cron = require('./cron')
// Import and Set Nuxt.js options

config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  if (config.dev) {
    const builder = new Builder(nuxt)
    builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(
    session({
      // secret: process.env.password,
      secret: 'justWork',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    })
  )

  app.use(nuxt.render)
  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
