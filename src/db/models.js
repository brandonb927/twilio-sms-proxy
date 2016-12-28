import _ from 'lodash'
import {dataTypes, db} from './config'

const baseProperties = {
  pubId: {
    type: dataTypes.UUID,
    defaultValue: dataTypes.UUIDV4,
    field: 'pub_id'
  },
  created: {
    type: dataTypes.DATE,
    defaultValue: dataTypes.NOW
  },
  modified: {
    type: dataTypes.DATE,
    defaultValue: dataTypes.NOW
  },
  meta: dataTypes.JSON
}

export const Thread = db.define('thread', _.extend(baseProperties, {
  messages: dataTypes.ARRAY(dataTypes.DECIMAL)
}))

export const Message = db.define('message', _.extend(baseProperties, {
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

export const Recipient = db.define('recipient', _.extend(baseProperties, {
  number: {
    type: dataTypes.STRING,
    notNull: true
  },
  name: dataTypes.STRING,
}))
