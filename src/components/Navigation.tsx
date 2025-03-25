"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaDesktop,
  FaPalette,
  FaIdCard,
  FaTshirt,
  FaShareAlt,
  FaFileAlt,
  FaBullhorn,
  FaImage,
  FaShoppingCart,
  FaRocket,
  FaUser,
  FaCloud,
  FaRobot,
  FaVideo, // New icon for video editing
} from "react-icons/fa";

export default function Navigation() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGraphicOpen, setIsGraphicOpen] = useState(false);
  const [isVideoEditingOpen, setIsVideoEditingOpen] = useState(false);
  const [isWebDevOpen, setIsWebDevOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Reset dropdown states when closing the mobile menu
    if (isMenuOpen) {
      setIsGraphicOpen(false);
      setIsVideoEditingOpen(false);
      setIsWebDevOpen(false);
    }
  };

  // Helper to highlight the active link
  const isActive = (path: string) => {
    return pathname === path
      ? "text-white bg-gray-800 hover:text-white p-2 rounded-lg font-semibold "
      : "";
  };

  return (
    <>
      <nav className="sticky top-0 bg-white border-b border-gray-200 shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/GrafiXr-logo-transparent-white.png"
                  alt="Logo"
                  width={500}
                  height={500}
                  className="w-auto h-10 sm:h-12 md:h-14 lg:h-16"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center font-bold">
              <Link
                href="/"
                className={`text-gray-900 hover:text-gray-700 transition-colors duration-300 hover:scale-105 ${isActive(
                  "/"
                )}`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`text-gray-900 hover:text-gray-700 transition-colors duration-300 hover:scale-105 ${isActive(
                  "/about"
                )}`}
              >
                About Us
              </Link>

              {/* Graphic Design Dropdown – primary service with glow effect */}
              <div className="relative group">
                <button
                  className={`glow-effect flex items-center gap-1 text-gray-900 hover:text-gray-50 focus:outline-none transition-colors duration-300 ${
                    pathname.startsWith("/services/graphic-design")
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  Graphic Design
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-max bg-white border border-gray-200 rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <ul className="p-2 grid grid-cols-2 gap-2">
                    <li>
                      <Link
                        href="/services/graphic-design/ui-design"
                        className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 transition-colors duration-300 ${isActive(
                          "/services/graphic-design/ui-design"
                        )}`}
                      >
                        <FaDesktop className="w-5 h-5" /> UI Design
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/graphic-design/logo-design"
                        className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 transition-colors duration-300 ${isActive(
                          "/services/graphic-design/logo-design"
                        )}`}
                      >
                        <FaPalette className="w-5 h-5" /> Logo Design
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/graphic-design/business-cards"
                        className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 transition-colors duration-300 ${isActive(
                          "/services/graphic-design/business-cards"
                        )}`}
                      >
                        <FaIdCard className="w-5 h-5" /> Business Cards
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/graphic-design/tshirt-graphics"
                        className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 transition-colors duration-300 ${isActive(
                          "/services/graphic-design/tshirt-graphics"
                        )}`}
                      >
                        <FaTshirt className="w-5 h-5" /> T-shirt Graphics
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/graphic-design/social-media-design"
                        className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 transition-colors duration-300 ${isActive(
                          "/services/graphic-design/social-media-design"
                        )}`}
                      >
                        <FaShareAlt className="w-5 h-5" /> Social Media Design
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/graphic-design/flyers-brochures"
                        className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 transition-colors duration-300 ${isActive(
                          "/services/graphic-design/flyers-brochures"
                        )}`}
                      >
                        <FaFileAlt className="w-5 h-5" /> Flyers & Brochures
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/graphic-design/banners-signs"
                        className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 transition-colors duration-300 ${isActive(
                          "/services/graphic-design/banners-signs"
                        )}`}
                      >
                        <FaBullhorn className="w-5 h-5" /> Banners & Signs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/graphic-design/image-editing"
                        className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 transition-colors duration-300 ${isActive(
                          "/services/graphic-design/image-editing"
                        )}`}
                      >
                        <FaImage className="w-5 h-5" /> Image Editing
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Video Editing Dropdown */}
              <div className="relative group">
                <button
                  className={`glow-effect flex items-center gap-1 text-gray-900 hover:text-gray-50 focus:outline-none transition-colors duration-300 ${
                    pathname.startsWith("/services/video-editing")
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  Video Editing
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-max bg-white border border-gray-200 rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <ul className="p-2 grid grid-cols-1 gap-2">
                    <li>
                      <Link
                        href="/services/video-editing/long-form"
                        className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 transition-colors duration-300 ${isActive(
                          "/services/video-editing/long-form"
                        )}`}
                      >
                        <FaVideo className="w-5 h-5" /> Long-Form Video Editing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/video-editing/short-form"
                        className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 transition-colors duration-300 ${isActive(
                          "/services/video-editing/short-form"
                        )}`}
                      >
                        <FaVideo className="w-5 h-5" /> Short-Form Video Editing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/video-editing/promotional"
                        className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 transition-colors duration-300 ${isActive(
                          "/services/video-editing/promotional"
                        )}`}
                      >
                        <FaVideo className="w-5 h-5" /> Promotional/Corporate Video Editing
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Web Development Dropdown */}
              <div className="relative group">
                <button
                  className={`glow-effect flex items-center gap-1 text-gray-900 hover:text-gray-50 focus:outline-none transition-colors duration-300 ${
                    pathname.startsWith("/services/web-development")
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  Web Development
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <ul className="p-2 space-y-1">
                    <li>
                      <Link
                        href="/services/web-development/ecommerce"
                        className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 transition-colors duration-300 ${isActive(
                          "/services/web-development/ecommerce"
                        )}`}
                      >
                        <FaShoppingCart className="w-5 h-5" /> E-commerce Stores
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/web-development/landing-pages"
                        className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 transition-colors duration-300 ${isActive(
                          "/services/web-development/landing-pages"
                        )}`}
                      >
                        <FaRocket className="w-5 h-5" /> Landing Pages
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/web-development/personal-portfolio"
                        className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 transition-colors duration-300 ${isActive(
                          "/services/web-development/personal-portfolio"
                        )}`}
                      >
                        <FaUser className="w-5 h-5" /> Personal Portfolio
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/web-development/saas-software"
                        className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 transition-colors duration-300 ${isActive(
                          "/services/web-development/saas-software"
                        )}`}
                      >
                        <FaCloud className="w-5 h-5" /> SAAS Software
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/web-development/ai-development"
                        className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 transition-colors duration-300 ${isActive(
                          "/services/web-development/ai-development"
                        )}`}
                      >
                        <FaRobot className="w-5 h-5" /> A.I Development
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/contact"
                className={`text-gray-900 hover:text-gray-700 transition-colors duration-300 hover:scale-105 ${isActive(
                  "/contact"
                )}`}
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-gray-700 focus:outline-none transition-colors duration-300"
              >
                {isMenuOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu – Fullscreen Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gradient-to-br from-gray-900 to-black text-white z-20 overflow-auto">
          <div className="flex flex-col items-start justify-center h-full space-y-6 px-4">
            <Link
              href="/about"
              className={`text-2xl font-bold hover:text-gray-300 pl-4 ${isActive(
                "/about"
              )}`}
              onClick={toggleMenu}
            >
              About Us
            </Link>

            {/* Mobile Graphic Design Dropdown */}
            <div className="w-full">
              <button
                onClick={() => setIsGraphicOpen(!isGraphicOpen)}
                className={`w-full flex items-center justify-between text-2xl font-bold hover:text-gray-300 px-4 py-2 focus:outline-none glow-effect ${
                  pathname.startsWith("/services/graphic-design")
                    ? "text-blue-600"
                    : ""
                }`}
              >
                Graphic Design
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isGraphicOpen ? (
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
                      d="M19 9l-7 7-7-7"
                    />
                  )}
                </svg>
              </button>
              {isGraphicOpen && (
                <ul className="mt-4 space-y-4 pl-8 text-xl">
                  <li>
                    <Link
                      href="/services/graphic-design/ui-design"
                      className={`flex items-center gap-3 hover:text-gray-300 transition-colors duration-300 ${isActive(
                        "/services/graphic-design/ui-design"
                      )}`}
                      onClick={toggleMenu}
                    >
                      <FaDesktop className="w-6 h-6" /> UI Design
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/graphic-design/logo-design"
                      className={`flex items-center gap-3 hover:text-gray-300 transition-colors duration-300 ${isActive(
                        "/services/graphic-design/logo-design"
                      )}`}
                      onClick={toggleMenu}
                    >
                      <FaPalette className="w-6 h-6" /> Logo Design
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/graphic-design/business-cards"
                      className={`flex items-center gap-3 hover:text-gray-300 transition-colors duration-300 ${isActive(
                        "/services/graphic-design/business-cards"
                      )}`}
                      onClick={toggleMenu}
                    >
                      <FaIdCard className="w-6 h-6" /> Business Cards
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/graphic-design/tshirt-graphics"
                      className={`flex items-center gap-3 hover:text-gray-300 transition-colors duration-300 ${isActive(
                        "/services/graphic-design/tshirt-graphics"
                      )}`}
                      onClick={toggleMenu}
                    >
                      <FaTshirt className="w-6 h-6" /> T-shirt Graphics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/graphic-design/social-media-design"
                      className={`flex items-center gap-3 hover:text-gray-300 transition-colors duration-300 ${isActive(
                        "/services/graphic-design/social-media-design"
                      )}`}
                      onClick={toggleMenu}
                    >
                      <FaShareAlt className="w-6 h-6" /> Social Media Design
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/graphic-design/flyers-brochures"
                      className={`flex items-center gap-3 hover:text-gray-300 transition-colors duration-300 ${isActive(
                        "/services/graphic-design/flyers-brochures"
                      )}`}
                      onClick={toggleMenu}
                    >
                      <FaFileAlt className="w-6 h-6" /> Flyers & Brochures
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/graphic-design/banners-signs"
                      className={`flex items-center gap-3 hover:text-gray-300 transition-colors duration-300 ${isActive(
                        "/services/graphic-design/banners-signs"
                      )}`}
                      onClick={toggleMenu}
                    >
                      <FaBullhorn className="w-6 h-6" /> Banners & Signs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/graphic-design/image-editing"
                      className={`flex items-center gap-3 hover:text-gray-300 transition-colors duration-300 ${isActive(
                        "/services/graphic-design/image-editing"
                      )}`}
                      onClick={toggleMenu}
                    >
                      <FaImage className="w-6 h-6" /> Image Editing
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Mobile Video Editing Dropdown */}
            <div className="w-full">
              <button
                onClick={() => setIsVideoEditingOpen(!isVideoEditingOpen)}
                className={`glow-effect w-full flex items-center justify-between text-2xl font-bold hover:text-gray-300 px-4 py-2 focus:outline-none ${
                  pathname.startsWith("/services/video-editing")
                    ? "text-blue-600"
                    : ""
                }`}
              >
                Video Editing
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isVideoEditingOpen ? (
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
                      d="M19 9l-7 7-7-7"
                    />
                  )}
                </svg>
              </button>
              {isVideoEditingOpen && (
                <ul className="mt-4 space-y-4 pl-8 text-xl">
                  <li>
                    <Link
                      href="/services/video-editing/long-form"
                      className={`flex items-center gap-3 hover:text-gray-300 transition-colors duration-300 ${isActive(
                        "/services/video-editing/long-form"
                      )}`}
                      onClick={toggleMenu}
                    >
                      <FaVideo className="w-6 h-6" /> Long-Form Video Editing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/video-editing/short-form"
                      className={`flex items-center gap-3 hover:text-gray-300 transition-colors duration-300 ${isActive(
                        "/services/video-editing/short-form"
                      )}`}
                      onClick={toggleMenu}
                    >
                      <FaVideo className="w-6 h-6" /> Short-Form Video Editing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/video-editing/promotional"
                      className={`flex items-center gap-3 hover:text-gray-300 transition-colors duration-300 ${isActive(
                        "/services/video-editing/promotional"
                      )}`}
                      onClick={toggleMenu}
                    >
                      <FaVideo className="w-6 h-6" /> Promotional/Corporate Video Editing
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Mobile Web Development Dropdown */}
            <div className="w-full">
              <button
                onClick={() => setIsWebDevOpen(!isWebDevOpen)}
                className={`glow-effect w-full flex items-center justify-between text-2xl font-bold hover:text-gray-300 px-4 py-2 focus:outline-none ${
                  pathname.startsWith("/services/web-development")
                    ? "text-blue-600"
                    : ""
                }`}
              >
                Web Development
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isWebDevOpen ? (
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
                      d="M19 9l-7 7-7-7"
                    />
                  )}
                </svg>
              </button>
              {isWebDevOpen && (
                <ul className="mt-4 space-y-4 pl-8 text-xl">
                  <li>
                    <Link
                      href="/services/web-development/ecommerce"
                      className={`flex items-center gap-3 hover:text-gray-300 transition-colors duration-300 ${isActive(
                        "/services/web-development/ecommerce"
                      )}`}
                      onClick={toggleMenu}
                    >
                      <FaShoppingCart className="w-6 h-6" /> E-commerce Stores
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/web-development/landing-pages"
                      className={`flex items-center gap-3 hover:text-gray-300 transition-colors duration-300 ${isActive(
                        "/services/web-development/landing-pages"
                      )}`}
                      onClick={toggleMenu}
                    >
                      <FaRocket className="w-6 h-6" /> Landing Pages
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/web-development/personal-portfolio"
                      className={`flex items-center gap-3 hover:text-gray-300 transition-colors duration-300 ${isActive(
                        "/services/web-development/personal-portfolio"
                      )}`}
                      onClick={toggleMenu}
                    >
                      <FaUser className="w-6 h-6" /> Personal Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/web-development/saas-software"
                      className={`flex items-center gap-3 hover:text-gray-300 transition-colors duration-300 ${isActive(
                        "/services/web-development/saas-software"
                      )}`}
                      onClick={toggleMenu}
                    >
                      <FaCloud className="w-6 h-6" /> SAAS Software
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/web-development/ai-development"
                      className={`flex items-center gap-3 hover:text-gray-300 transition-colors duration-300 ${isActive(
                        "/services/web-development/ai-development"
                      )}`}
                      onClick={toggleMenu}
                    >
                      <FaRobot className="w-6 h-6" /> A.I Development
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            <Link
              href="/contact"
              className={`text-2xl font-bold hover:text-gray-300 pl-4 ${isActive(
                "/contact"
              )}`}
              onClick={toggleMenu}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
