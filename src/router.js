import express from 'express'
import {Recipient} from './db/models'
import t from './twilio'

const router = express.Router()

router.post('/sms/webhooks', (req, res) => {
  // let fromRecipient = Recipient.getByNumber(req.body.From)
  // let toRecipient = Recipient.getByNumber(req.body.To)

  res.status(200).json({
    success: true,
    data: {
      message: 'Hello world',
      fromRecipient: req.body.From,
      toRecipient: req.body.To,
      // fromRecipient: fromRecipient,
      // toRecipient: toRecipient,
    }
  })
})

export default router
