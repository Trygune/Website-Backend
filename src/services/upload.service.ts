import { randomUUID } from 'node:crypto'
import sharp from 'sharp'
import cloudinary from '../config/cloudinary.ts'

type ImageQuery = {
  for?: 'projects' | 'posts' | 'avatars'
}

export const processAndSaveImage = async (
  buffer: Buffer,
  query?: ImageQuery
) => {
  const fileQuery =
    query?.for === 'projects' ||
    query?.for === 'posts' ||
    query?.for === 'avatars'
      ? query?.for
      : undefined

  const folder = `uploads/images/${fileQuery ?? 'general'}`
  const publicId = randomUUID()

  const processedBuffer = await sharp(buffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer()

  const result = await new Promise<{
    secure_url: string
    public_id: string
  }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        resource_type: 'image',
        format: 'webp',
      },
      (error, result) => {
        if (error) {
          reject(error)
          return
        }

        if (!result) {
          reject(new Error('Cloudinary upload failed'))
          return
        }

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        })
      }
    )

    uploadStream.end(processedBuffer)
  })

  return {
    url: result.secure_url,
    publicId: result.public_id,
  }
}

export const removeImage = async (publicId: string) => {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: 'image',
  })

  return {
    success: result.result === 'ok' || result.result === 'not found',
    result: result.result,
  }
}
