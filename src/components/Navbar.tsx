/* eslint-disable @next/next/no-img-element */
'use client';
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { copy } from '@/copy';
import { useTabs } from '@/hooks';
import { ModeToggle } from './ModeToggle';
import { FaSearch } from 'react-icons/fa';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { useSupabaseAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { toast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { Recipe } from '@/types/recipe';

const { nav } = copy.common;

export const Navbar: FC = () => {
  const tabs = useTabs();
  const { theme, resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState(nav.logo.src);
  const { session, setSession } = useSupabaseAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setSession(null);
      toast.success('Successfully logged out');
      router.push('/');
    } else {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      toast.info('Please enter a search term');
      return;
    }
  
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .or(
          `title.ilike.%${searchQuery}%,ingredients.ilike.%${searchQuery}%,difficulty.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`
        );
        console.log('Search data:', data);
  
      if (error) {
        toast.error(`Error: ${error.message}`);
      } else if (data.length === 0) {
        toast.info('No recipes found under the search term');
      } else {
        setSearchResults(data as Recipe[]);
        toast.success('Search completed');
        router.push(
          `/search?results=${encodeURIComponent(JSON.stringify(data))}`
        );
      }
    } catch (error) {
      toast.error(
        `Unexpected error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  useEffect(() => {
    if (theme === 'dark' || resolvedTheme === 'dark') {
      setLogoSrc(nav.logo.darkSrc as typeof nav.logo.src);
    } else {
      setLogoSrc(nav.logo.src);
    }
  }, [theme, resolvedTheme]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow-sm py-2 px-4 items-center justify-between flex-wrap border-b border-slate-300 bg-opacity-70 dark:border-slate-700 bg-slate-200 dark:bg-black dark:bg-opacity-85 hidden md:flex">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold flex-shrink-0">
          <img className="w-[22%] scale-150" src={logoSrc} alt={nav.logo.alt} />
        </Link>
        <div className="relative flex items-center -ml-96">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-100 border-2 border-gray-300 rounded-lg py-1 px-1 shadow-md dark:bg-slate-800 dark:text-white"
          />
          <Button
            onClick={handleSearch}
            className="primary ml-0.5 shadow-md text-primary-foreground dark:text-primary-foreground px-3"
          >
            <FaSearch />
          </Button>
        </div>
      </div>
      <div className="flex justify-end items-center space-x-4">
        <ol className="flex justify-center items-center space-x-2 list-none">
          <li>
            <Link
              href="/recipes"
              className={`${tabs.recipes ? 'border-primary dark:border-primary text-primary dark:text-primary' : 'border-transparent hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary'} inline-flex items-center border-b-2 text-lg font-medium p-2 sm:justify-between`}
            >
              {nav.recipes}
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`${tabs.about ? 'border-primary dark:border-primary text-primary dark:text-primary' : 'border-transparent hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary'} inline-flex items-center border-b-2 text-lg font-medium p-2 sm:justify-between`}
            >
              {nav.about}
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`${tabs.contact ? 'border-primary dark:border-primary text-primary dark:text-primary' : 'border-transparent hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary'} inline-flex items-center border-b-2 text-lg font-medium p-2 sm:justify-between`}
            >
              {nav.contact}
            </Link>
          </li>
          {!session ? (
            <>
              <li>
                <Link
                  href="/login"
                  className={`${tabs.login ? 'border-primary dark:border-primary text-primary dark:text-primary' : 'border-transparent hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary'} inline-flex items-center border-b-2 text-lg font-medium p-2 sm:justify-between`}
                >
                  {nav.login}
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="inline-flex items-center border-b-2 text-lg font-medium p-2 sm:justify-between border-transparent hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary"
              >
                Log Out
              </button>
            </li>
          )}
        </ol>
        <div className="mr-4">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
