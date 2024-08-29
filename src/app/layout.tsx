
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './media600px.css'
import { Provider } from 'components/ApolloProvider/Provider'
import * as React from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Legitem | Management',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href='/manifest.json' sizes="any"></link>
        <link rel="icon" href="/Legitem-svg-svg_server.svg" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/Legitem-svg-svg_server.svg" />
      </head>
      <body className={inter.className}>
      <ToastContainer/>
        {/* <NextUIProvider> */}
        <Provider>{children}</Provider>
        {/* </NextUIProvider> */}

      </body>
    </html>
  )
}
