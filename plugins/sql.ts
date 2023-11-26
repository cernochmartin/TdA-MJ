import mysql from 'mysql2'
import dotenv from 'dotenv'

export default defineNuxtPlugin(() => {
  dotenv.config()
  const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

  return {
    provide: {
      mysql: connection
    }
  }
})