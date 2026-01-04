import { defineConfig } from 'prisma/config'
import { loadEnvFile } from 'node:process'

loadEnvFile()

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
})
