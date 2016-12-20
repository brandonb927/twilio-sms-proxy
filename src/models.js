class BaseClass {
  constructor (fields={}) {
    this.created = fields.created || new Date().getUTCSeconds()
    this.modified = fields.modified || new Date().getUTCSeconds()
    this.meta = fields.meta || {}
  }
}

class Thread extends BaseClass {
  constructor (fields={}) {
    super(fields)
    this.messages = fields.messages || []
  }
}

class Message extends BaseClass {
  constructor (fields={}) {
    super(fields)
    this.from = fields.from
    this.to = fields.to
  }
}

class Recipient extends BaseClass {
  constructor (fields={}) {
    super(fields)
    this.name = fields.name
    this.number = fields.number
  }
}

export {Thread, Message, Recipient}
