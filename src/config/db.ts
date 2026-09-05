import mongoose from 'mongoose'
import logger from '../utils/logger.ts'

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    logger.info('MongoDB connected')
  } catch (error) {
    logger.error(error, 'MongoDB connection failed')
    process.exit(1)
  }
}

export default connectMongoDB
