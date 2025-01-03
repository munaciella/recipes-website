/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, FC, useEffect } from 'react';
import Link from 'next/link';
import { HiX } from 'react-icons/hi';
import { HiBars4 } from 'react-icons/hi2';
import { copy } from '@/copy';
import { ModeToggle } from './ModeToggle';
import { useTheme } from 'next-themes';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useSupabaseAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { toast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { Recipe } from '@/types/recipe';

const { nav } = copy.common;

export const MobileNavbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
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

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      if (currentScrollTop !== lastScrollTop) {
        setIsMenuOpen(false);
      }
      lastScrollTop = currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full top-0 z-50 shadow-sm py-2 px-4 grid grid-cols-3 items-center bg-slate-100 bg-opacity-70 dark:bg-black dark:bg-opacity-70 border-b border-slate-300 dark:border-slate-700 md:hidden transition-all backdrop-blur-sm">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-primary-background px-2 mr-3"
      >
        {isMenuOpen ? (
          <>
            <HiX size={28} /> <span className="sr-only">Close menu</span>
          </>
        ) : (
          <>
            <HiBars4 size={28} /> <span className="sr-only">Open menu</span>
          </>
        )}
      </button>
      <Link href="/" className="flex justify-center" onClick={handleMenuClick}>
        <img
          className="scale-150 rounded-2xl w-[80%]"
          src={logoSrc}
          alt={nav.logo.alt}
        />
      </Link>
      <div className="flex justify-end">
        <ModeToggle />
      </div>
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-50 dark:bg-black border-t border-slate-100 dark:border-slate-800 flex flex-col items-start text-primary-700 text-xl transition-transform duration-300 transform">
          <div className="flex items-center p-4 w-full">
            <Input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-slate-300 rounded-lg py-1 px-2 shadow-md dark:bg-slate-800 dark:text-white w-full"
            />
            <Button
              onClick={handleSearch}
              className="primary ml-0.5 shadow-md text-slate-900 dark:text-white"
            >
              <FaSearch />
            </Button>
          </div>
          <ul className="list-none w-full">
            <li className="px-4 py-2 w-full hover:underline">
              <Link href="/recipes" onClick={handleMenuClick}>
                {nav.recipes}
              </Link>
            </li>
            <li className="pt-2">
              <hr className="bg-gray-800 w-full" />
            </li>
            <li className="px-4 py-2 w-full hover:underline">
              <Link href="/about" onClick={handleMenuClick}>
                {nav.about}
              </Link>
            </li>
            <li className="pt-2">
              <hr className="bg-gray-800 w-full" />
            </li>
            <li className="px-4 py-2 w-full hover:underline">
              <Link href="/contact" onClick={handleMenuClick}>
                {nav.contact}
              </Link>
            </li>
            <li className="pt-2">
              <hr className="bg-gray-800 w-full" />
            </li>
            {!session ? (
              <>
                <li className="px-4 py-2 w-full hover:underline">
                  <Link href="/login" onClick={handleMenuClick}>
                    {nav.login}
                  </Link>
                </li>
                <li className="pt-2">
                  <hr className="bg-gray-800 w-full" />
                </li>
              </>
            ) : (
              <>
                <li className="px-4 py-2 w-full">
                  {/* <button onClick={handleLogout} className="hover:underline">
                    Log Out
                  </button> */}
                  <Link href="/user" aria-label="User Page">
                <FaUserCircle className="text-3xl text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary" />
              </Link>
                </li>
                <li className="pt-2">
                  <hr className="bg-gray-800 w-full" />
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};
