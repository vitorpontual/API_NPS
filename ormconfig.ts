import { createConnection } from "typeorm"

const pass = process.env.DBPASS
const dbname = process.env.DBNAME


export default {
  "type":"postgres",
  "host": "localhost",
  "port": "5432",
  "username":"postgres",
  "password": pass,
  "database": dbname,
  "logging": false,
  "migrations": ["./src/database/migrations/**.ts"],
  "entities": ["./src/app/models/*.ts"],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}