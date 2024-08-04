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

const { nav } = copy.common;

export const Navbar: FC = () => {
  const tabs = useTabs();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow-sm py-2 px-4 items-center justify-between flex-wrap bg-slate-50 dark:bg-slate-900 hidden md:flex">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold flex-shrink-0">
          <img
            className="w-[30%] scale-110"
            src={nav.logo.src}
            alt={nav.logo.alt}
          />
        </Link>
        <div className="relative flex items-center -ml-96">
          <Input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg py-1 px-2 shadow-md dark:bg-slate-800 dark:text-white"
          />
          <Button className="primary ml-0.5 shadow-md text-slate-900 dark:text-white">
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