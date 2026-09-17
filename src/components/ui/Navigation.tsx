'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Theater } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/home', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/auditions', label: 'Auditions' },
  { href: '/organizations', label: 'Organizations' },
  { href: '/rentals', label: 'Rentals' },
  { href: '/spaces', label: 'Spaces' },
  { href: '/directory', label: 'Directory' },
];

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const hydrated = useHydrated();
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-900/95 backdrop-blur-sm border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/home" className="flex items-center space-x-2 text-amber-500 hover:text-amber-400 transition-colors">
            <Theater className="h-8 w-8" />
            <span className="text-xl font-serif font-bold">CDA Theater Alliance</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-amber-500 ${
                  hydrated && pathname === link.href ? 'text-amber-500' : 'text-stone-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-stone-300 hover:text-amber-500 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-stone-900 border-t border-stone-800"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-base font-medium transition-colors hover:text-amber-500 ${
                    hydrated && pathname === link.href ? 'text-amber-500' : 'text-stone-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}