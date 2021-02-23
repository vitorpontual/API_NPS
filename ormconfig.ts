import 'dotenv/config'

const pass = process.env.DBPASS
const dbname = process.env.DBNAME

export default {
  "type":"postgres",
  "host": "localhost",
  "port": "5432",
  "username":"postgres",
  "password": pass,
  "database": dbname,
  "logging": true,
  "migrations": ["./src/database/migrations/**.ts"],
  "entities": ["./src/app/models/*.ts"],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}