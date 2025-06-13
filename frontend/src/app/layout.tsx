import type { Metadata } from "next";
import { Orienta } from "next/font/google";
import "./globals.css";
import SideMenu from "@/components/SideMenu/SideMenu";
import s from "@/app/layout.module.css";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";

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

export const metadata: Metadata = {
  title: "ChillPlayer",
  description: "Music player for your chill vibes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orienta.variable}`}>
        <div className={s.containerRow}>
            <SideMenu />
            <div className={s.containerColumn}>
                {children}
                <AudioPlayer />
            </div>
        </div>
      </body>
    </html>
  );
}
