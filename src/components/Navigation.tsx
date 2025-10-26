'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/90 backdrop-blur-xl border-b border-border shadow-sm'
          : 'bg-background/50 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Image
              src="/vektra-logo.svg"
              alt="Vektra"
              width={120}
              height={40}
              className="h-6 w-auto dark:invert opacity-90"
              priority
            />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#dashboard"
              className="text-sm text-muted hover:text-foreground transition-colors duration-200 font-light tracking-wide"
            >
              Dashboard
            </a>
            <a
              href="#pricing"
              className="text-sm text-muted hover:text-foreground transition-colors duration-200 font-light tracking-wide"
            >
              Pricing
            </a>
            <a
              href="#docs"
              className="text-sm text-muted hover:text-foreground transition-colors duration-200 font-light tracking-wide"
            >
              Documentation
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm text-muted hover:text-foreground transition-colors duration-200 font-light tracking-wide">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
