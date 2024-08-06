/* eslint-disable @next/next/no-img-element */
'use client';
import { FC } from 'react';
import Link from 'next/link';
import { copy } from '@/copy';
import { useTabs } from '@/hooks';
import { ModeToggle } from './ModeToggle';
import { FaSearch } from 'react-icons/fa';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';

const { nav } = copy.common;

export const Navbar: FC = () => {
  const tabs = useTabs();
  const { theme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow-sm py-2 px-4 items-center justify-between flex-wrap border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-secondary hidden md:flex">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold flex-shrink-0">
          <img
            className="w-[22%] scale-150"
            src={theme === 'dark' ? nav.logo.darkSrc : nav.logo.src}
            alt={nav.logo.alt}
          />
        </Link>
        <div className="relative flex items-center -ml-96">
          <Input
            type="text"
            placeholder="Search..."
            className="bg-slate-100 border-2 border-gray-300 rounded-lg py-1 px-1 shadow-md dark:bg-slate-700 dark:text-white"
          />
          <Button className="primary ml-0.5 shadow-md text-slate-900 dark:text-white px-3">
            <FaSearch />
          </Button>
        </div>
      </div>
      <div className="flex justify-end items-center space-x-4">
        <ol className="flex justify-center items-center space-x-2">
          <li>
            <Link href="/about" className={`${tabs.about ? 'border-slate-800 dark:border-white text-gray-900 dark:text-white' : 'border-transparent hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white'} inline-flex items-center border-b-2 text-lg font-medium p-2 sm:justify-between`}>
              {nav.about}
            </Link>
          </li>
          <li>
            <Link href="/recipes" className={`${tabs.recipes ? 'border-slate-800 dark:border-white text-gray-900 dark:text-white' : 'border-transparent hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white'} inline-flex items-center border-b-2 text-lg font-medium p-2 sm:justify-between`}>
              {nav.recipes}
            </Link>
          </li>
          <li>
            <Link href="/contact" className={`${tabs.contact ? 'border-slate-800 dark:border-white text-gray-900 dark:text-white' : 'border-transparent hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white'} inline-flex items-center border-b-2 text-lg font-medium p-2 sm:justify-between`}>
              {nav.contact}
            </Link>
          </li>
          <li>
            <Link href="/signup" className={`${tabs.signup ? 'border-slate-800 dark:border-white text-gray-900 dark:text-white' : 'border-transparent hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white'} inline-flex items-center border-b-2 text-lg font-medium p-2 sm:justify-between`}>
              {nav.signup}
            </Link>
          </li>
          <li>
            <Link href="/login" className={`${tabs.login ? 'border-slate-800 dark:border-white text-gray-900 dark:text-white' : 'border-transparent hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white'} inline-flex items-center border-b-2 text-lg font-medium p-2 sm:justify-between`}>
              {nav.login}
            </Link>
          </li>
        </ol>
        <div className="mr-4">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};