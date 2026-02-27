import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

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
      <body className={`${nunito.className} antialiased flex flex-col min-h-screen`} suppressHydrationWarning>
        <NuqsAdapter>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </NuqsAdapter>
      </body>
    </html>
  );
}
