import 'dotenv/config'

import express from 'express'
import bodyParser from 'body-parser'
import router from './router'

const PORT = process.env.PORT || 3030

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1', router)

app.listen(PORT)
console.log(`Magic happens on port ${PORT}`)
