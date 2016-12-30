import express from 'express'
import bodyParser from 'body-parser'
import router from './router'
import {initModels} from './db/models'

const PORT = process.env.PORT || 3030

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1', router)

// Catch-all
app.use('*', (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'This is not the JSON you\'re looking for…',
    data: {}
  })
})

// Once the db is up, run the thing
initModels().then(() => {
  app.listen(PORT)
  console.log(`😁  App running on port ${PORT}`)
})
