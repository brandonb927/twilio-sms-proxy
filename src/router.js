import express from 'express'
import {Thread, Message, Recipient} from './models'

import twilio from 'twilio'


const t = new twilio.RestClient(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const router = express.Router()

router.post('/sms/receive', (req, res) => {
  let fromRecipient = Recipient.getByNumber(req.body.From)
  let toRecipient = Recipient.getByNumber(req.body.To)
  res.status(200).json({
    success: true,
    data: {
      message: 'Hello world',
      fromRecipient: fromRecipient,
      toRecipient: toRecipient,
    }
  })
})

export default router
