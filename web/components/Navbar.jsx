'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const getDashboardUrl = () => {
  // Check if we're in production (Vercel deployment)
  const isProduction = typeof window !== 'undefined' &&
    (window.location.hostname.includes('vercel.app') ||
     window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1');

  return isProduction
    ? 'https://liquidity-system.vercel.app/'
    : 'http://localhost:3000';
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 glass-1 glass-border backdrop-blur-xl px-8 py-3">
        <nav className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <div className="w-7 h-7 bg-green rounded-lg flex items-center justify-center font-black text-bg text-xs">
              LI
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-text text-sm">Liquidity Intelligence</div>
              <div className="text-xs text-muted">Platform</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/features" className="text-text hover:text-green transition-colors text-sm">
              Features
            </Link>
            <Link href="/architecture" className="text-text hover:text-green transition-colors text-sm">
              Architecture
            </Link>
            <Link href="/contact" className="text-text hover:text-green transition-colors text-sm">
              Contact
            </Link>
            <Link href={getDashboardUrl()} target="_blank" className="glass-1 glass-border px-3 py-2 rounded-lg text-text hover:glass-2 transition-all text-xs min-h-[36px] flex items-center">
              Open Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden glass-1 glass-border p-2 rounded-lg hover:glass-2 transition-all min-h-[36px] min-w-[36px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-10 md:hidden">
          <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute top-14 left-8 right-8 glass-1 glass-border rounded-lg p-4 space-y-3">
            <Link
              href="/features"
              className="block text-text hover:text-green transition-colors py-2 text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/architecture"
              className="block text-text hover:text-green transition-colors py-2 text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Architecture
            </Link>
            <Link
              href="/contact"
              className="block text-text hover:text-green transition-colors py-2 text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-3 border-t border-border">
              <Link
                href={getDashboardUrl()}
                target="_blank"
                className="block glass-1 glass-border px-3 py-2 rounded-lg text-text hover:glass-2 transition-all text-center font-medium text-sm min-h-[36px] flex items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Open Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}