import Sequelize from 'sequelize'

const sequelizeOpts = {
  dialect: 'postgres',
  logging: false,
  native: true,
  ssl: true
}

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()

  // Log things from sequelize locally only
  // sequelizeOpts.logging = true
}

export const dataTypes = Sequelize.DataTypes

export const db = new Sequelize(process.env.DATABASE_URL, sequelizeOpts)

export function initDB (resetTables=false) {
  let opts = {}

  // Drop tables and recreate db if reset is passed
  if (resetTables) {
    opts.force = true
  }

  // Create the tables
  return db.sync(opts).then(() => {
    console.log('🔑  Created database tables')
  })
}
