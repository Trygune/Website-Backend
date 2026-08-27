import { type Request } from 'express'
import multer from 'multer'

const storage = multer.memoryStorage()

const fileFilter = (req: Request, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed'))
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

export default upload
