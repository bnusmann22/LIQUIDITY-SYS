import { Inter } from 'next/font/google';
import Link from 'next/link';
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
          <header className="sticky top-0 z-10 glass-1 glass-border backdrop-blur-xl px-6 py-4">
            <nav className="max-w-7xl mx-auto flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green rounded-lg flex items-center justify-center font-black text-bg">
                  LI
                </div>
                <div>
                  <div className="font-bold text-text">Liquidity Intelligence</div>
                  <div className="text-sm text-muted">Platform</div>
                </div>
              </Link>
              <div className="flex items-center gap-6">
                <Link href="/features" className="text-text hover:text-green transition-colors">
                  Features
                </Link>
                <Link href="/architecture" className="text-text hover:text-green transition-colors">
                  Architecture
                </Link>
                <Link href="/contact" className="text-text hover:text-green transition-colors">
                  Contact
                </Link>
                <Link href="http://localhost:3000" target="_blank" className="glass-1 glass-border px-4 py-2 rounded-lg text-text hover:glass-2 transition-all">
                  Open Dashboard
                </Link>
              </div>
            </nav>
          </header>
          <main className="max-w-7xl mx-auto px-6 py-12">
            {children}
          </main>
          <footer className="glass-1 glass-border mt-12 px-6 py-8">
            <div className="max-w-7xl mx-auto text-center text-muted">
              <p>&copy; 2026 Liquidity Intelligence Platform. Real-time liquidity decision system.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}