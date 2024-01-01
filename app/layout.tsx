import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/navbar'
import ClientOnly from './components/ClientOnly'
import Modal from './components/modal/modal'
import RegisterModal from './components/modal/RegisterModal'
import TosterProvider from './providers/TosterProvider'



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
        <TosterProvider/>
        <RegisterModal/>
        <Navbar />
        </ClientOnly>
        
        
        {children}</body>
    </html>
  )
}
