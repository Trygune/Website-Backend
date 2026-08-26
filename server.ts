import app from './src/app.ts'
import connectMongoDB from './src/config/db.ts'
import logger from './src/utils/logger.ts'

const port = Number(process.env.PORT)

const startServer = async () => {
  await connectMongoDB()

  app.listen(port, () => {
    logger.info(`Server running on port ${port}`)
  })
}

startServer()
