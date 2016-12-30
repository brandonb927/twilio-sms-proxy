import _ from 'lodash'
import {dataTypes, db} from './config'

const baseProperties = {
  pubId: {
    type: dataTypes.UUID,
    defaultValue: dataTypes.UUIDV4,
    field: 'pub_id'
  },
  meta: dataTypes.JSON
}

let Thread = db.define('Thread', _.extend(baseProperties, {
  messages: dataTypes.ARRAY(dataTypes.DECIMAL)
}))

let Message = db.define('Message', _.extend(baseProperties, {
  to: {
    type: dataTypes.INTEGER,
    notNull: true,
  },
  from: {
    type: dataTypes.INTEGER,
    notNull: true,
  },
  body: dataTypes.TEXT,
  media: dataTypes.ARRAY(dataTypes.TEXT)
}))

let Recipient = db.define('Recipient', _.extend(baseProperties, {
  number: {
    type: dataTypes.STRING,
    notNull: true
  },
  name: dataTypes.STRING,
}))

Recipient.getByNumber = function (number) {
  return this.findOne({
    where: {
      number: number
    }
  })
}

export {
  Thread,
  Message,
  Recipient
}
