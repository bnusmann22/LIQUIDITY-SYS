import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Liquidity Intelligence Platform",
  description: "Real-time liquidity decision system under uncertainty"
};

export default function WebLayout({ children }) {
  return (
    <html lang="en" className="bg-bg">
      <body className={`${inter.className} bg-bg text-text`}>
        <div className="min-h-screen bg-bg text-text">
          <Navbar />
          <main>
            {children}
          </main>
          <footer className="glass-1 glass-border mt-6 px-8 py-4">
            <div className="max-w-4xl mx-auto text-center text-muted text-xs">
              <p>&copy; 2026 Liquidity Intelligence Platform. Real-time liquidity decision system.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}