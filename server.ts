import app from './src/app.ts'
import connectMongoDB from './src/config/db.ts'
import logger from './src/utils/logger.ts'
import dns from 'node:dns'

const port = Number(process.env.PORT)

dns.setServers(['1.1.1.1', '8.8.8.8'])

const startServer = async () => {
  await connectMongoDB()

  app.listen(port, () => {
    logger.info(`Server running on port ${port}`)
  })
}

startServer()
