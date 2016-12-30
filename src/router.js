import express from 'express'
import {Recipient} from './db/models'
import t from './twilio'

const router = express.Router()

router.post('/sms/webhooks', (req, res) => {
  // TODO: move this into a worker class spawned from here
  Promise.all([
    Recipient.getByNumber(req.body.From),
    Recipient.getByNumber(req.body.To)
  ])
  .then((values) => {
    let [fromRecipient, toRecipient] = values

    if (!fromRecipient) {
      throw new Error(`Recipient with number ${req.body.From} does not exist`)
    }
    if (!toRecipient) {
      throw new Error(`Recipient with number ${req.body.To} does not exist`)
    }

    res.status(200).json({
      success: true,
      data: {
        message: 'Here\'s who you sent to',
        fromRecipient: fromRecipient.name,
        toRecipient: toRecipient.name,
      }
    })
  }).catch((err) => {
    console.error(err)

    res.status(400).json({
      success: false,
      data: {
        message: 'Something wicked happened, sorry \'bout that',
      }
    })
  })
})

export default router
