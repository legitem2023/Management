
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './media600px.css'
import './media1080px.css'

import { Provider } from 'components/ApolloProvider/Provider'

import * as React from "react";
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Legitem',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href='/manifest.json' sizes="any"></link>
      </head>
      <body className={inter.className}>

        {/* <NextUIProvider> */}
        <Provider>{children}</Provider>
        {/* </NextUIProvider> */}

      </body>
    </html>
  )
}
