import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mongatthukaran | എന്റെ അക്ഷരലോകം",
  description:
    "യാത്രകൾ, കഥകൾ, കവിതകൾ, കുറുംകവിതകൾ, ലേഖനങ്ങൾ - മോങ്ങത്തുകാരന്റെ അക്ഷരലോകത്തേക്ക് സ്വാഗതം. Malayalam literary blog by Mongatthukaran featuring stories, travelogues, poems, and essays.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
