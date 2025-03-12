'use client'; // Mark this as a Client Component

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              GrafiXr
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/about" className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
              About
            </Link>
            <Link href="/services" className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
              Services
            </Link>
            <Link href="/portfolio" className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
              Portfolio
            </Link>
            <Link href="/contact" className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/about"
              className="block text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              About
            </Link>
            <Link
              href="/services"
              className="block text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className="block text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              Portfolio
            </Link>
            <Link
              href="/contact"
              className="block text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}