import Sequelize from 'sequelize'
import {Thread, Message, Recipient} from './models'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

export function databaseUp () {
  let opts = {}

  // Drop tables and recreate in local only
  if (process.env.NODE_ENV !== 'production') {
    opts.force = true
  }

  return new Promise((resolve, reject) =>{
    // Create the tables
    Thread.sync(opts)
    Message.sync(opts)
    Recipient.sync(opts)

    resolve(true)
  })
}

export const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres'
})

export const dataTypes = Sequelize.DataTypes
