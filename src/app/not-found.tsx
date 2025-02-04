"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-center bg-white text-black dark:bg-gray-950 dark:text-white">
      <div className="space-y-6">
        <Image src="/assets/Pizza Box-big.png" alt="404 Error" width={500} height={500} className="mx-auto mb-6 mt-20" />
        <h1 className="text-6xl font-extrabold">404</h1>
        <p className="text-2xl md:text-3xl">Oops! The page you’re looking for doesn’t seem to exist, just like the pizza!</p>
        <p className="text-lg md:text-xl">Try checking the URL or head back to the homepage.</p>
        <Link href="/" className="inline-block mt-6 px-6 py-3 text-xl font-semibold text-white bg-primary hover:bg-green-600 rounded-md transition duration-300" aria-label="Go to homepage">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
