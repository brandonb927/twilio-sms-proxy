/**
 * Parse an SMS message and return meta, etc.
 *
 * Example: A parsable message might look something like below
 * to: +1 (250) 555-1234
 * some message
 * maybe multi lines?
 */

const SPLIT_CHAR = '\n'
const STRIP_REGEX = new RegExp(/^\s+|\s+$/g)
const REPLACE_NON_DIGIT_REGEX = new RegExp(/[^\d]/gi)

export default function parseMessage (sms) {
  let splitMessage = sms.split(SPLIT_CHAR) // Split on the first new line
  let recipientNumber = splitMessage.shift()
  let body = splitMessage.join(SPLIT_CHAR)

  // Split anything we don't want from the start and end of the strings
  // http://stackoverflow.com/a/14572494/582369
  recipientNumber = recipientNumber.replace(STRIP_REGEX, '')
  body = body.replace(STRIP_REGEX, '')

  // Make sure the recipientNumber number is formatted correctly
  recipientNumber = recipientNumber.replace(REPLACE_NON_DIGIT_REGEX, '')

  let number = recipientNumber ? `+${recipientNumber}` : null

  return {
    number: number,
    body: body
  }
}
