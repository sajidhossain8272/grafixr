'use client'; // Mark this as a Client Component for interactivity

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ColorfulScene from '@/components/ColorfulHoverEffect'; // Import the ColorfulHoverEffect component

// Dummy data for featured work
const featuredWork = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'A stunning web design project.',
    image: 'https://images.pexels.com/photos/1601773/pexels-photo-1601773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 2,
    title: 'Project Beta',
    description: 'A mobile app development project.',
    image: 'https://images.pexels.com/photos/2473183/pexels-photo-2473183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 3,
    title: 'Project Gamma',
    description: 'A branding and identity project.',
    image: 'https://images.pexels.com/photos/3310691/pexels-photo-3310691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export default function Home() {
  const controls = useAnimation();

  // Animate the hero section on page load
  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white'>
      {/* Hero Section */}
      <section className='h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden'>
        {/* Colorful Hover Effect */}
        <ColorfulScene />

        {/* Hero Content */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={controls}
          transition={{ duration: 1 }}
          className='text-6xl font-bold mb-4 text-gray-900 dark:text-white relative z-10'
        >
          We Create <span className='text-gray-950 dark:text-gray-50'>Digital Experiences</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 1, delay: 0.5 }}
          className='text-xl mb-8 text-gray-900 dark:text-white relative z-10'
        >
          Transforming ideas into stunning realities.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 1, delay: 1 }}
          className='relative z-10'
        >
          <Link
            href='/portfolio'
            className='bg-gray-900 dark:bg-gray-200 text-white dark:text-black font-bold px-6 py-3 rounded-lg dark:hover:bg-gray-50 hover:bg-gray-800 transition-colors'
          >
            View Our Work
          </Link>
        </motion.div>
      </section>

      {/* Featured Work Carousel */}
      <section className='py-16 px-4'>
        <h2 className='text-4xl font-bold text-center mb-8'>Featured Work</h2>
        <div className='flex overflow-hidden space-x-4 max-w-4xl mx-auto'>
          {featuredWork.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className='flex-shrink-0 w-80 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden'
            >
              <div className='relative w-full h-48'>
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  priority={index === 0} // Prioritize the first image for LCP
                />
              </div>
              <div className='p-4'>
                <h3 className='text-xl font-bold'>{work.title}</h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  {work.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}