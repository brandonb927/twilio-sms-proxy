import {
  MissingParameter,
  ExpectedTypeError
} from '../src/errors'

import {
  Thread,
  Message,
  Recipient
} from '../src/models'

test('Valid Recipient', () => {
  const recipient = new Recipient({ name: 'Foo Bar', number: '+12345678910' })
  it('should not throw an error', () => {
    expect(recipient).not.toThrow()
  })
  it('should be an instance of Recipient', () => {
    expect(recipient).toBeInstanceOf(Recipient)
  })
})

test('Invalid Recipient', () => {
  it('should throw an error', () => {
    expect(new Recipient()).toThrow()
  })
  it('should throw MissingParameterError', () => {
    expect(
      new Recipient()
    ).toThrowError(MissingParameter)
  })
  it('should throw MissingParameterError and match the message', () => {
    expect(
      new Recipient()
    ).toThrowError('Missing parameter "name"')
  })
  it('should throw MissingParameterError and match the message', () => {
    expect(
      new Recipient({ name: 'Foo Bar' })
    ).toThrowError('Missing parameter "number"')
  })
  it('should throw MissingParameterError and match the message', () => {
    expect(
      new Recipient({ number: '+12345678910' })
    ).toThrowError('Missing parameter "name"')
  })
})

test('Valid Message', () => {
  const message = new Message({
    from: new Recipient({ name: 'Foo Bar', number: '+12345678910' }),
    to: new Recipient({ name: 'Baz Qux', number: '+15558675309' })
  })
  it('should be an instance of Message and contain a from', () => {
    expect(Object.keys(message)).toContain('from')
  })
  it('should be an instance of Message and contain a from', () => {
    expect(Object.keys(message)).toContain('to')
  })
})

test('Invalid Message', () => {
  it('should throw an error', () => {
    expect(
      new Message()
    ).toThrow()
  })
  it('should throw ExpectedTypeError', () => {
    expect(
      new Message({
        to: new Recipient({ name: 'foo bar' }),
        from: ''
      })
    ).toThrowError(ExpectedTypeError)
  })
  it('should throw ExpectedTypeError and match the message', () => {
    expect(
      new Message({
        to: new Recipient({ name: 'foo bar' }),
        from: ''
      })
    ).toThrowError('Expected type "Recipient"')
  })
})

test('Valid Thread', () => {
  it('should have no messages', () => {
    const thread = new Thread({ messages: [] })
    expect(
      thread.messages
    ).toHaveLength(0)
  })
})
