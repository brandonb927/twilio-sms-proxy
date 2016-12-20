import express from 'express'
import {Thread, Message, Recipient} from './models'

import twilio from 'twilio'

const errorHandler = (err) => {
  if (err) {
    console.error(err.message)
    res.json({
      success: false,
      data: {
        message: err.message,
      }
    })
  }
}

const t = new twilio.RestClient(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'This is not the JSON you\'re looking for'
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
      errorHandler(err)

      // TODO: Write data to db or persist somewhere

      res.json({
        success: true,
        message: `Sent an SMS message to ${req.body.to}`,
        data: {
          sid: message.sid
        }
      })
    }
  )
})

export default router
