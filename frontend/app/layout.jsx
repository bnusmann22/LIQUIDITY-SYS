import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Liquidity Intelligence Platform",
  description: "Real-time liquidity decision system under uncertainty"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-bg">
      <body className={`${inter.className} bg-bg text-text`}>{children}</body>
    </html>
  );
}
