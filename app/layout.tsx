import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // EZ A FONTOS SOR!

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZENYX Platform",
  description: "Next Gen Crypto Trading",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
