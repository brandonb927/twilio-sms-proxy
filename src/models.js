function throwIfMissing (param) {
  throw new Error(`Missing parameter "${param}"`);
}

function typeCheck (expectedType, obj) {
  if (obj.constructor.name !== expectedType) {
    throw new Error(`Expected type "${expectedType}"`)
  }
  return obj
}

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
  // TODO: some sorting methods maybe?
}

/**
*
*/
class Message extends BaseClass {
  constructor (params={}) {
    super(params)
    this.from = typeCheck('Recipient', params.from) || throwIfMissing('from')
    this.to = typeCheck('Recipient', params.to) || throwIfMissing('to')
  }
  // TODO: probably missing some params, etc.
}

/**
*
*/
class Recipient extends BaseClass {
  constructor (params={}) {
    super(params)
    this.name = params.name || throwIfMissing('name')
    this.number = params.number || throwIfMissing('number')
  }
  // TODO: probably missing some params, etc.
}

export {
  Thread,
  Message,
  Recipient
}
