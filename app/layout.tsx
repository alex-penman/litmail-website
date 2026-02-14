import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LitMail - Professional Email Hosting at 90% Less Cost',
  description: 'Privacy-focused custom domain email hosting. Professional email for $3-5/month. Your data, your server, your control.',
  keywords: 'email hosting, custom domain email, privacy email, cheap email hosting, alternative to Zoho, alternative to Google Workspace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
