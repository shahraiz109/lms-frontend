'use client'
import "./globals.css";
// import type { Metadata } from "next";
import {Poppins} from "next/font/google"
import {Josefin_Sans} from "next/font/google"
import { ThemeProvider } from "./utills/Theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provier";
import {SessionProvider} from "next-auth/react"
import React from "react";
import Loader from "./components/Loader/Loader"
import { useLoadUserQuery } from "../redux/features/api/apiSlice";

  const poppins = Poppins({
    subsets:["latin"],
    weight:["400","500","600","700"],
    variable:"--font-Poppins",
  })

  const josefin = Josefin_Sans({
    subsets:["latin"],
    weight:["400","500","600","700"],
    variable:"--font-josefin",
  })

// export const metadata:Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}>
        <Providers>
          <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Custom>{children}</Custom>
          <Toaster position="top-center" reverseOrder={false}/>
        </ThemeProvider>
        </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}


const Custom:React.FC<{children: React.ReactNode}> = ({children}) => {
  const {isLoading}= useLoadUserQuery({})
  return(
    <>
    {
      isLoading ? <Loader/> : <>{children}</>
    }
    </>
  )
}