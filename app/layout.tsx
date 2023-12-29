import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/navbar'
import ClientOnly from './components/ClientOnly'

import RegisterModel from './components/modal/RegisterModal'
import ToasterProvider from './provider/TosterProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'airbnb',
  description: 'Airbnb clone',
}
const font =Nunito({
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider/>
          <RegisterModel/>
          <Navbar />
        </ClientOnly>
        
        
        {children}</body>
    </html>
  )
}
