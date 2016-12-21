import twilio from 'twilio'

export default function () {
  return new twilio.RestClient(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  )
}
