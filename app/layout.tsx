import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

const sofiaPro = localFont({
  src: [
    {
      path: '../public/fonts/Sofia-Pro-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Sofia-Pro-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sofia',
})

const oohBaby = localFont({
  src: '../public/fonts/OoohBaby-Regular.ttf',
  variable: '--font-ooh-baby',
})

export const metadata: Metadata = {
  title: 'Jerelle.co | Commercial Photo & Video | Southern Alberta',
  description: 'Real marketing for real business. Commercial photography and video production that actually drives results.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sofiaPro.variable} ${oohBaby.variable}`}>
      <body className={sofiaPro.className}>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
