"use client";

import Link from "next/link";
import React, { JSX } from "react";

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-900 text-gray-200'>
      <div className='container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center'>
        {/* Logo and Tagline */}
        <div className='mb-4 md:mb-0 text-center md:text-left'>
          <Link
            href='/'
            className='text-3xl font-bold text-white hover:text-gray-300 transition-colors'
          >
            Grafixr
          </Link>
          <p className='mt-2 text-sm'>
            We create stunning designs that elevate your brand.
          </p>
        </div>

        {/* Navigation Links */}
        <div className='flex flex-wrap justify-center gap-6'>
          <Link href='/about' className='hover:text-white transition-colors'>
            About Us
          </Link>
          <Link
            href='/portfolio'
            className='hover:text-white transition-colors'
          >
            Portfolio
          </Link>
          <Link href='/services' className='hover:text-white transition-colors'>
            Services
          </Link>
          <Link href='/contact' className='hover:text-white transition-colors'>
            Contact
          </Link>
        </div>
      </div>

      <div className='border-t border-gray-800'>
        <div className='container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between'>
          <p className='text-sm'>
            &copy; {currentYear} Grafixr. All rights reserved.
          </p>
          <div className='flex space-x-4 mt-4 md:mt-0'>
            <a
              href='https://facebook.com/designerrony1'
              className='hover:text-white transition-colors'
              aria-label='Facebook'
              target='_blank'
              rel='noopener noreferrer'
            >
              <svg
                className='w-5 h-5 fill-current'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path d='M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.325 24H12V14.708h-3.293v-3.612H12V8.414c0-3.287 1.992-5.077 4.898-5.077 1.394 0 2.588.104 2.935.15v3.406h-2.018c-1.584 0-1.892.753-1.892 1.858v2.437h3.783l-.493 3.612h-3.29V24h6.445C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z' />
              </svg>
            </a>
            <a
              href='https://youtube.com/@GrafiXr07/featured'
              className='hover:text-white transition-colors'
              aria-label='Youtube'
              target='_blank'
              rel='noopener noreferrer'
            >
              <svg
                className='w-5 h-5 fill-current'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path d='M23.498 6.186a2.999 2.999 0 0 0-2.112-2.12C19.79 3.5 12 3.5 12 3.5s-7.79 0-9.386.566A2.999 2.999 0 0 0 .502 6.186 31.737 31.737 0 0 0 0 12c0 1.963.194 3.882.502 5.814a2.999 2.999 0 0 0 2.112 2.12C4.21 20.5 12 20.5 12 20.5s7.79 0 9.386-.566a2.999 2.999 0 0 0 2.112-2.12c.308-1.932.502-3.851.502-5.814s-.194-3.882-.502-5.814zM9.75 15.02V8.98l6 3.02-6 3.02z' />
              </svg>
            </a>
            <a
              href='https://instagram.com/grafixr07'
              className='hover:text-white transition-colors'
              aria-label='Instagram'
              target='_blank'
              rel='noopener noreferrer'
            >
              <svg
                className='w-5 h-5 fill-current'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path d='M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.966.24 2.42.403.59.21 1.01.465 1.454.909.443.444.699.864.909 1.454.163.454.35 1.25.404 2.42.058 1.266.07 1.646.07 4.85 0 3.204-.012 3.584-.07 4.85-.054 1.17-.24 1.966-.404 2.42-.21.59-.465 1.01-.909 1.454-.444.443-.864.699-1.454.909-.454.163-1.25.35-2.42.404-1.266.058-1.646.07-4.85.07-3.204 0-3.584-.012-4.85-.07-1.17-.054-1.966-.24-2.42-.404-.59-.21-1.01-.465-1.454-.909-.443-.444-.699-.864-.909-1.454-.163-.454-.35-1.25-.404-2.42C2.175 15.747 2.163 15.367 2.163 12c0-3.204.012-3.584.07-4.85.054-1.17.24-1.966.404-2.42.21-.59.465-1.01.909-1.454.444-.443.864-.699 1.454-.909.454-.163 1.25-.35 2.42-.404C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.132 4.658.332 3.757.634c-.913.31-1.69.724-2.466 1.5C.724 3.91.31 4.688 0 5.6.332 4.658.132 5.771.072 7.052.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.06 1.281.26 2.394.562 3.295.31.913.724 1.69 1.5 2.466.776.776 1.553 1.19 2.466 1.5.901.302 2.014.502 3.295.562C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.281-.06 2.394-.26 3.295-.562.913-.31 1.69-.724 2.466-1.5.776-.776 1.19-1.553 1.5-2.466.302-.901.502-2.014.562-3.295C23.987 15.668 24 15.259 24 12c0-3.259-.013-3.668-.072-4.948-.06-1.281-.26-2.394-.562-3.295-.31-.913-.724-1.69-1.5-2.466C21.91.724 21.132.31 20.22 0c-.901-.302-2.014-.502-3.295-.562C15.668.013 15.259 0 12 0z' />
                <path d='M12 5.838a6.162 6.162 0 1 0 0 12.324A6.162 6.162 0 0 0 12 5.838zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' />
                <circle cx='18.406' cy='5.594' r='1.44' />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
