import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://mongatthukaran.in"),
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
