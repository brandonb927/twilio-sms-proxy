import express from 'express'
import bodyParser from 'body-parser'
import router from './router'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

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

app.listen(PORT)
console.log(`Magic happens on port ${PORT}`)
