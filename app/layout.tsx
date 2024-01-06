import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/navbar'
import ClientOnly from './components/ClientOnly'
import Modal from './components/modal/modal'
import RegisterModal from './components/modal/RegisterModal'
import TosterProvider from './providers/TosterProvider'

import RegisterModel from './components/modal/RegisterModal'
import ToasterProvider from './provider/TosterProvider'
import LoginModal from './components/modal/LoginModal'
import getCurrentUser from './action/getCurrentUser'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'airbnb',
  description: 'Airbnb clone',
}
const font =Nunito({
  subsets: ["latin"],
});


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currnetUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <TosterProvider/>
        <RegisterModal/>
        <LoginModal/>
        <Navbar currentUser={currnetUser}/>
        </ClientOnly>
        
        
        {children}</body>
    </html>
  )
}
