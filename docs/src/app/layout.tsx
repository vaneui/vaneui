'use client';

import { Inter, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';
import React from 'react';
import { ThemeProvider } from '@vaneui/ui';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

//export const metadata: Metadata = {
//  title: 'VaneUI Documentation',
//  description: 'Documentation and component showcase for VaneUI library',
//};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <head>
      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96"/>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
      <link rel="shortcut icon" href="/favicon.ico"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
    </head>
    <body className={`${inter.className} ${jetBrainsMono.variable}`}>
    <ThemeProvider>
      {children}
    </ThemeProvider>
    </body>
    </html>
  );
}
