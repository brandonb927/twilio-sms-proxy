import express from 'express'
import {Thread, Message, Recipient} from './models'

import twilio from 'twilio'

const t = new twilio.RestClient(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'HOORAY!'
  })
})

router.post('/message', (req, res) => {
  let clientData = {
    body: req.body.body,
    to: req.body.to,
    from: process.env.TWILIO_SMS_NUMBER
  }

  t.messages.create(
    clientData,
    (err, message) => {
      if(err) {
        console.error(err.message)
        res.json({
          message: err.message
        })
      }

      res.json({
        message: 'Sent an SMS message'
      })
    }
  )
})

export default router
