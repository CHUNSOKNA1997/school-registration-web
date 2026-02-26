import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Starlight Academy",
  description: "School Registration Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className={`${nunito.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
