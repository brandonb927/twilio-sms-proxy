/**
 * Parse an SMS message and return meta, etc.
 *
 * Example: A parsable message might look something like below
 * to: +1 (250) 555-1234
 * some message
 * maybe multi lines?
 */

const SPLIT_CHAR = '\n'
const MATCH_TO_REGEX = new RegExp(/^to:?\s?(.*)\n/gi)
const STRIP_REGEX = new RegExp(/^\s+|\s+$/g)
const REPLACE_NON_DIGIT_REGEX = new RegExp(/[^\d]/gi)

export default function parseMessage (sms) {
  let recipientNumber = null
  let body = null
  let containsToNumber = false

  if (sms.match(MATCH_TO_REGEX)) {
    containsToNumber = true
  }

  if (containsToNumber) {
    // Split on the first new line after the initial "to: ..."
    let splitMessage = sms.split('\n')

    // Do some massaging of the text
    recipientNumber = splitMessage.shift()
    recipientNumber = recipientNumber.replace(STRIP_REGEX, '')
    recipientNumber = recipientNumber.replace(REPLACE_NON_DIGIT_REGEX, '')
    body = splitMessage.join(SPLIT_CHAR)
    body = body.replace(STRIP_REGEX, '')
  } else {
    body = sms
  }

  return {
    number: recipientNumber ? `+${recipientNumber}` : null,
    body: body
  }
}
