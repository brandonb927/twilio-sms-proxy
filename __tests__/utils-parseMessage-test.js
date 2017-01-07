import parseMessage from '../src/utils/parseMessage'

test('Valid simple parsed message', () => {
  const unparsedMessage = `to: 1 250 555 0123

  this message is test
  some multiline kinda shit
  kinda like haiku`

  const expectedRecipient = `+12505550123`
  const expectedBody = `this message is test
  some multiline kinda shit
  kinda like haiku`

  const message = parseMessage(unparsedMessage)
  it('should contain a recipient field', () => {
    expect(message).toContain('recipient')
  })
  it('should contain a body field', () => {
    expect(message).toContain('body')
  })
  it('should contain a recipient field', () => {
    expect(message.recipient).toEqual(expectedRecipient)
  })
  it('should contain a body field', () => {
    expect(message.body).toEqual(expectedBody)
  })
})

test('Valid average parsed message', () => {
  const unparsedMessage = `to: +1 (250) 555-0123

  Here's some unicode emoji 🏂🏂🏂
  and a new line because some people do this in an SMS. Maybe another sentence. Or two.

  Some new lines here as well.`

  const expectedRecipient = `+12505550123`
  const expectedBody = `Here's some unicode emoji 🏂🏂🏂
  and a new line because some people do this in an SMS. Maybe another sentence. Or two.

  Some new lines here as well.`

  const message = parseMessage(unparsedMessage)
  it('should contain a recipient field', () => {
    expect(message).toContain('recipient')
  })
  it('should contain a body field', () => {
    expect(message).toContain('body')
  })
  it('should contain a recipient field', () => {
    expect(message.recipient).toEqual(expectedRecipient)
  })
  it('should contain a body field', () => {
    expect(message.body).toEqual(expectedBody)
  })
})
