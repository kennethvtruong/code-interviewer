import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <script src="//sdk.twilio.com/js/video/releases/2.17.1/twilio-video.min.js"></script> */}

      <body className={inter.className}>{children}</body>
    </html>
  )
}
