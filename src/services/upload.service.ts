import { randomUUID } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

type ImageQuery = {
  for?: 'projects' | 'posts' | 'avatars'
}

export const processAndSaveImage = async (
  buffer: Buffer,
  query?: ImageQuery
) => {
  const uploadDir = path.join(
    process.cwd(),
    'public',
    'uploads',
    'images',
    query?.for ?? ''
  )
  const filename = `${randomUUID()}.webp`

  const outputPath = path.join(uploadDir, filename)

  await sharp(buffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outputPath)

  const url = `/uploads/images/${query?.for ?? ''}${query?.for ? '/' : ''}${filename}`

  return {
    filename,
    url,
  }
}

export const removeImage = async (filename: string, query?: ImageQuery) => {
  const safeFilename = path.basename(filename)

  const uploadDir = path.join(
    process.cwd(),
    'public',
    'uploads',
    'images',
    query?.for ?? ''
  )

  const outputPath = path.join(uploadDir, safeFilename)
  try {
    await fs.unlink(outputPath)

    return {
      success: true,
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error('Image not found')
    }

    throw error
  }
}
