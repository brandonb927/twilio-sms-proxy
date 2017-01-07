import express from 'express'
import {
  Recipient,
  Message
} from './db/models'
import parseMessage from './utils/parseMessage'
import {SMSWorker} from './workers'

const router = express.Router()

function throwError (number) {
  throw new Error(`Recipient with number ${number} does not exist`)
}

function sendMessageToRecipient (message) {
  console.info(message.toJSON())

  // let worker = new SMSWorker()
  // worker.spawn(twilioMessageData)
}

function twilioResponseHandler (res) {
  res.setHeader('Content-Type', 'text/xml')
  res.status(200)
  res.send('<Response></Response>')
}

router.post('/sms/webhooks', (req, res) => {
  // Parse the message and get the intended
  // recipient's number and body of the message
  let {number, body} = parseMessage(req.body.Body)

  // Try and lookup the parsed To and From recipients
  Promise.all([
    Recipient.getByNumber(req.body.From),
    Recipient.getByNumber(number)
  ]).then((values) => {
    let [fromRecipient, toRecipient] = values

    // Check if the From recipient is even from someone we care about
    if (!fromRecipient) {
      throwError(req.body.From)
    }

    // If the To recipient doesn't exist, drop out at this point
    if (!toRecipient) {
      // TODO: lookup whether or not the incoming message is part of an ongoing thread
      Recipient
        .getByNumber(req.body.To)
        .then((recipient) => {
          if (!recipient) {
            throwError(recipient)
          }

          return Message.create({
            to: recipient.id,
            from: fromRecipient.id,
            body: body
          })
        })
        .then((message) => {
          sendMessageToRecipient(message)
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      Message.create({
        to: toRecipient.id,
        from: fromRecipient.id,
        body: body
      })
      .then((message) => {
        sendMessageToRecipient(message)
      })
      .catch((err) => {
        console.error(err)
      })
    }
  }).catch((err) => {
    console.error(err)
  })

  // NOTE: Always need to respond to the webhook caller, regardless of what happens
  twilioResponseHandler(res)
})

export default router
