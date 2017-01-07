import twilio from 'twilio'

const client = new twilio.RestClient(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export default client
