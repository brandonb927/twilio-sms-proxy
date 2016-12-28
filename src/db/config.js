import Sequelize from 'sequelize'
import {Thread, Message, Recipient} from './models'

const sequelizeOpts = {
  dialect: 'postgres',
  logging: false
}

if (process.env.NODE_ENV !== 'production') {
  // Local .env stuff
  require('dotenv').config()

  // Log things from sequelize locally only
  sequelizeOpts.logging = true
}

export function databaseUp () {
  let opts = {}

  // Drop tables and recreate in local only
  // if (process.env.NODE_ENV !== 'production') {
  //   opts.force = true
  // }

  return new Promise((resolve, reject) =>{
    // Create the tables
    Thread.sync(opts)
    Message.sync(opts)
    Recipient.sync(opts)

    console.log('🔑  Created database tables')

    resolve(true)
  })
}

export const db = new Sequelize(process.env.DATABASE_URL, sequelizeOpts)

export const dataTypes = Sequelize.DataTypes
