'use client'
import type { Metadata } from "next";
import { Orienta } from "next/font/google";
import "./globals.css";
import SideMenu from "$/components/SideMenu/SideMenu";
import s from "$/app/layout.module.css";
import AudioPlayer from "$/components/AudioPlayer/AudioPlayer";
import {useState} from "react";
import {PlayContextProvider} from "$/app/PlayContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
//

const orienta = Orienta({
    weight: ["400"],
    variable: "--font-orienta",
    subsets: ["latin"]
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orienta.variable}`}>
          <PlayContextProvider>
            <div className={s.containerRow}>
                <SideMenu />
                <div className={s.containerColumn}>
                    {children}
                    <AudioPlayer />
                </div>
            </div>
          </PlayContextProvider>
      </body>
    </html>
  );
}
