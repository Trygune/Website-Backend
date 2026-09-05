import { Resend } from 'resend'
import fs from 'node:fs/promises'
import path from 'node:path'

const resend = new Resend(process.env.RESEND_API_KEY)

const templatePath = path.join(
  process.cwd(),
  'src',
  'emails',
  'reset-password.html'
)

const getResetPasswordTemplate = async (resetUrl: string) => {
  const template = await fs.readFile(templatePath, 'utf-8')

  return template
    .replaceAll('{{RESET_URL}}', resetUrl)
    .replaceAll('{{YEAR}}', new Date().getFullYear().toString())
}

export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string
) => {
  const html = await getResetPasswordTemplate(resetUrl)

  const { data, error } = await resend.emails.send({
    from: process.env.MAIL_FROM!,
    to: [email],
    subject: 'Reset your password',
    html,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}
