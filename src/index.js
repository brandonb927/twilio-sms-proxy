import express from 'express'
import Raven from 'raven'
import bodyParser from 'body-parser'
import router from './router'
import {initDB} from './db/config'

const PORT = process.env.PORT || 3030
const SENTRY_DSN = process.env.SENTRY_DSN || ''

if (SENTRY_DSN) {
  Raven.config(process.env.SENTRY_DSN).install()
}

const app = express()

if (SENTRY_DSN) {
  app.use(Raven.requestHandler())
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1', router)

if (SENTRY_DSN) {
  app.use(Raven.errorHandler())
}

// Catch-all
app.use('*', (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'This is not the JSON you\'re looking for…',
    data: {}
  })
})

// Once the db is up, run the thing
initDB().then(() => {
  app.listen(PORT)
  console.log(`😁  App running on port ${PORT}`)
})
