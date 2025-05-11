// app/layout.js
'use client'; // Add this at the top

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from 'next-auth/react';

// Move font declarations outside the component
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Separate metadata into its own file or remove it (since it won't work with 'use client')
// Create a separate metadata.js file if needed

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Navbar/>
          {children}
          <Footer/>
        </SessionProvider>
      </body>
    </html>
  );
}