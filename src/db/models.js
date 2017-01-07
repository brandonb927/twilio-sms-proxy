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

let Thread = db.define('Thread', _.merge({}, baseProperties, {
  messages: dataTypes.ARRAY(dataTypes.DECIMAL)
}), {
  classMethods: {
    associate: function(models) {
      Thread.hasMany(models.Message)
    }
  }
})

let Message = db.define('Message', _.merge({}, baseProperties, {
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
}), {
  classMethods: {
    associate: function(models) {
      Message.hasOne(models.Recipient)
    }
  }
})

let Recipient = db.define('Recipient', _.merge({}, baseProperties, {
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
