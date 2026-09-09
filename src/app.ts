import express, { type Express } from 'express'
import { authRouter } from './routes/auth.routes.ts'
import { projectRouter } from './routes/project.routes.ts'
import { postRouter } from './routes/post.routes.ts'
import { experienceRouter } from './routes/experience.routes.ts'
import { skillRouter } from './routes/skill.routes.ts'
import { dashboardRouter } from './routes/dashboard.routes.ts'
import { uploadRouter } from './routes/upload.routes.ts'
import './config/passport.ts'
import { pinoHttp } from 'pino-http'
import logger from './utils/logger.ts'
import errorHandler from './middlewares/error.middleware.ts'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import contactRouter from './routes/contact.routes.ts'
import helmet from 'helmet'
import analyticsRouter from './routes/analytics.routes.ts'

const apiVersion = process.env.API_VERSION

const app: Express = express()

app.set('trust proxy', 1)

app.use(
  pinoHttp({
    logger,
  })
)

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
  })
)

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)

app.use(express.static('public'))
app.use(express.json({ limit: '100kb' }))
app.use(express.urlencoded({ limit: '100kb', extended: true }))

app.use(cookieParser())

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running',
  })
})
app.use(`/api/${apiVersion}/auth`, authRouter)
app.use(`/api/${apiVersion}/projects`, projectRouter)
app.use(`/api/${apiVersion}/posts`, postRouter)
app.use(`/api/${apiVersion}/experiences`, experienceRouter)
app.use(`/api/${apiVersion}/skills`, skillRouter)
app.use(`/api/${apiVersion}/dashboard`, dashboardRouter)
app.use(`/api/${apiVersion}/uploads`, uploadRouter)
app.use(`/api/${apiVersion}/contact`, contactRouter)
app.use(`/api/${apiVersion}/analytics`, analyticsRouter)

app.use(errorHandler.notFoundHandler)

app.use(errorHandler.serverErrorsHandler)

export default app
