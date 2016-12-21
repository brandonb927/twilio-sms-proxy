import {
  MissingParameterError,
  throwIfMissing,
  typeCheck
} from './errors'

/**
* BaseClass is inherited by all other models
*/
class BaseClass {
  constructor (params={}) {
    this.created = params.created || new Date().getTime()
    this.modified = params.modified || new Date().getTime()
    this.meta = params.meta || {}
  }
}

/**
* A Thread contains a list of messages
*/
class Thread extends BaseClass {
  constructor (params={}) {
    super(params)
    this.messages = params.messages || []
  }

  static getClassName () {
    return 'Thread'
  }

  getClassName () {
    return Thread.getClassName()
  }
}

/**
* A Message contains
*/
class Message extends BaseClass {
  constructor (params={}) {
    super(params)
    this.to = typeCheck(Recipient, params.to) || throwIfMissing(Message, params.to, 'to')
    this.from = typeCheck(Recipient, params.from) || throwIfMissing(Message, params.from, 'from')
    this.message = params.message || ''
    this.media = params.media || []
  }

  static getClassName () {
    return 'Message'
  }

  getClassName () {
    return Message.getClassName()
  }
}

/**
*
*/
class Recipient extends BaseClass {
  constructor (params={}) {
    super(params)
    this.name = params.name || throwIfMissing(Recipient, params.name, 'name')
    this.number = params.number || throwIfMissing(Recipient, params.number, 'number')
  }

  static getClassName () {
    return 'Recipient'
  }

  getClassName () {
    return Recipient.getClassName()
  }
}

export {
  Thread,
  Message,
  Recipient
}
