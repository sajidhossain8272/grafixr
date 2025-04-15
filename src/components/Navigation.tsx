"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaDesktop,
  FaShoppingCart,
  FaVideo,
} from "react-icons/fa";

// Define the category type returned from your API
interface Category {
  _id: string;
  mainCategory: string;
  subCategories: string[];
}

export default function Navigation() {
  const pathname = usePathname();
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://grafixr-backend.vercel.app";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch dynamic categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [API_URL]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Helper to check if path is active (Exact match)
  const isActive = (path: string) =>
    pathname === path
      ? "text-white bg-gray-800 hover:text-white p-2 rounded-lg font-semibold"
      : "";

  return (
    <>
      <nav className='sticky top-0 bg-white border-b border-gray-200 shadow-lg z-40'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16 items-center'>
            {/* Logo */}
            <div className='flex-shrink-0'>
              <Link href='/'>
                <Image
                  src='/GrafiXr-logo-transparent-white.png'
                  alt='Logo'
                  width={500}
                  height={500}
                  className='w-auto h-10 sm:h-12 md:h-14 lg:h-16'
                  priority
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className='hidden md:flex space-x-8 items-center font-bold'>
              <Link
                href='/'
                className={`text-gray-900 transition-colors duration-300 hover:scale-105 ${isActive(
                  "/"
                )}`}
              >
                Home
              </Link>
              <Link
                href='/about'
                className={`text-gray-900 transition-colors duration-300 hover:scale-105 ${isActive(
                  "/about"
                )}`}
              >
                About Us
              </Link>
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className='relative group'
                  onMouseEnter={() => setHoveredCategory(cat.mainCategory)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <button className='flex items-center gap-1 text-gray-900 hover:text-blue-600 focus:outline-none transition-colors'>
                    {/* Optionally add icons for known categories */}
                    {cat.mainCategory === "graphic-design" && <FaDesktop />}
                    {cat.mainCategory === "video-editing" && <FaVideo />}
                    {cat.mainCategory === "web-development" && (
                      <FaShoppingCart />
                    )}
                    <span className='capitalize'>
                      {cat.mainCategory.replace("-", " ")}
                    </span>
                    <svg
                      className='h-4 w-4 transition-transform duration-300 group-hover:rotate-180'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </button>
                  {hoveredCategory === cat.mainCategory && (
                    <div className='absolute left-0 mt-2 w-max bg-white border border-gray-200 rounded-md shadow-xl transition-opacity duration-300 z-10'>
                      <ul className='p-2 space-y-1'>
                        {cat.subCategories.map((sub) => (
                          <li key={sub}>
                            <Link
                              // Updated: separate query parameters for mainCategory and subCategory
                              href={`/portfolio?mainCategory=${cat.mainCategory}&subCategory=${sub}`}
                              className='block px-3 py-1 text-gray-700 hover:bg-gray-100 transition-colors'
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
              <Link
                href='/contact'
                className={`text-gray-900 transition-colors duration-300 hover:scale-105 ${isActive(
                  "/contact"
                )}`}
              >
                Contact Us
              </Link>
              <Link
                href='/portfolio'
                className={`text-gray-900 transition-colors duration-300 hover:scale-105 ${isActive(
                  "/portfolio"
                )}`}
              >
                Portfolio
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className='flex items-center md:hidden'>
              <button
                onClick={toggleMenu}
                className='inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-gray-700 focus:outline-none transition-colors duration-300'
              >
                {isMenuOpen ? (
                  <FaTimes className='w-6 h-6' />
                ) : (
                  <FaBars className='w-6 h-6' />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu – Fullscreen Overlay */}
      {isMenuOpen && (
        <div className='md:hidden fixed inset-0 bg-gradient-to-br from-gray-900 to-black text-white z-20 overflow-auto p-4'>
          <Link
            href='/about'
            className={`block text-2xl font-bold hover:text-gray-300 mb-4 ${isActive(
              "/about"
            )}`}
            onClick={toggleMenu}
          >
            About Us
          </Link>
          {categories.map((cat) => (
            <div key={cat._id} className='mb-4'>
              <h3 className='text-xl font-semibold capitalize'>
                {cat.mainCategory.replace("-", " ")}
              </h3>
              <ul className='ml-4 mt-2 space-y-2'>
                {cat.subCategories.map((sub) => (
                  <li key={sub}>
                    <Link
                      // Updated: separate query parameters for mainCategory and subCategory on mobile
                      href={`/portfolio?mainCategory=${cat.mainCategory}&subCategory=${sub}`}
                      onClick={toggleMenu}
                      className='block hover:text-gray-300'
                    >
                      {sub}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            href='/contact'
            className={`block text-2xl font-bold hover:text-gray-300 mt-4 ${isActive(
              "/contact"
            )}`}
            onClick={toggleMenu}
          >
            Contact Us
          </Link>
          <Link
            href='/portfolio'
            className={`block text-2xl font-bold hover:text-gray-300 mt-4 ${isActive(
              "/portfolio"
            )}`}
            onClick={toggleMenu}
          >
            Portfolio
          </Link>
        </div>
      )}
    </>
  );
}
