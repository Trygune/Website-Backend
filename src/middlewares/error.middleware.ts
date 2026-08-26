import { type Request, type Response, type NextFunction } from 'express'
import logger from '../utils/logger.ts'

const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).send('Not Found')
}

const serverErrorsHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack)
  res.status(500).send('Something broke!')
}

export default { notFoundHandler, serverErrorsHandler }
