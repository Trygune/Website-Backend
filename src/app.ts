import express, { type Express } from 'express'
import { authRouter } from './routes/auth.routes.ts'
import { projectRouter } from './routes/project.routes.ts'
import { postRouter } from './routes/post.routes.ts'
import { experienceRouter } from './routes/experience.routes.ts'
import { dashboardRouter } from './routes/dashboard.routes.ts'
import './config/passport.ts'
import passport from 'passport'
import { pinoHttp } from 'pino-http'
import logger from './utils/logger.ts'
import errorHandler from './middlewares/error.middleware.ts'
import cookieParser from 'cookie-parser'

const app: Express = express()

app.use(
  pinoHttp({
    logger,
  })
)

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())

app.use(cookieParser())

app.use(passport.initialize())

app.use('/api/auth', authRouter)
app.use('/api/projects', projectRouter)
app.use('/api/posts', postRouter)
app.use('/api/experience', experienceRouter)
app.use('/api/dashboard', dashboardRouter)

app.use(errorHandler.notFoundHandler)

app.use(errorHandler.serverErrorsHandler)

export default app
