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

export const Thread = db.define('Thread', _.extend(baseProperties, {
  messages: dataTypes.ARRAY(dataTypes.DECIMAL)
}))

export const Message = db.define('Message', _.extend(baseProperties, {
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

export const Recipient = db.define('Recipient', _.extend(baseProperties, {
  number: {
    type: dataTypes.STRING,
    notNull: true
  },
  name: dataTypes.STRING,
}))

export function initModels (resetTables=false) {
  let opts = {}

  // Drop tables and recreate in local only, or if reset is passed
  if (process.env.NODE_ENV !== 'production' || resetTables) {
    opts.force = true
  }

  return new Promise((resolve, reject) =>{
    // Create the tables
    Thread.sync(opts)
    Message.sync(opts)
    Recipient.sync(opts)

    console.log('🔑  Created database tables')

    resolve(true)
  })
}
