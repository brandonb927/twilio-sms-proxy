/**
 * Worker classes
 */

import twilio from './twilio'

class WorkerBase {

  constructor () {
    // Nothing here yet
  }

  spawn (cb) {
    // TODO: make this a REAL worker class that is a one-off
    //       so we don't block the thread waiting to send an SMS
    console.info(`==> Booting worker, executing callback`)
    cb()
    console.info(`==> Worker done work, goodbye`)
  }

}

export class SMSWorker extends WorkerBase {

  constructor () {
    super()
  }

  spawn (data) {
    if (!data) {
      throw new Error(`Error, incorrect data passed to spawn method: ${data}`)
    }

    super.spawn(() => {
      // Send an SMS using the Twilio API
      console.info(`==> `, data)
      twilio.messages.create(
        data,
        (err, message) => {
          if (err) {
            return console.error(err)
          }

          // TODO: Write data to db or persist this msg ID somewhere
          console.info(message)
        }
      )
    })
  }

}
