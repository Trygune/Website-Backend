import { randomUUID } from 'node:crypto'
import path from 'node:path'
import sharp from 'sharp'

const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'images')

export const processAndSaveImage = async (buffer: Buffer) => {
  const filename = `${randomUUID()}.webp`

  const outputPath = path.join(uploadDir, filename)

  await sharp(buffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outputPath)

  return {
    filename,
    url: `/uploads/images/${filename}`,
  }
}
