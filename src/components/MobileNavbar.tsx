/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, FC, useEffect } from "react";
import Link from "next/link";
import { HiX } from "react-icons/hi";
import { HiBars4 } from "react-icons/hi2";
import { copy } from "@/copy";
import { ModeToggle } from "./ModeToggle";
import { useTheme } from "next-themes";
import { FaSearch } from "react-icons/fa";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const { nav } = copy.common;

export const MobileNavbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { theme, resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState(nav.logo.src);

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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full top-0 z-50 shadow-sm py-2 px-4 grid grid-cols-3 items-center bg-slate-50 dark:bg-black border-b border-slate-100 dark:border-slate-700 md:hidden transition-all">
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
          className="scale-150 rounded-2xl w-[60%]"
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
              className="border border-slate-300 rounded-lg py-1 px-2 shadow-md dark:bg-slate-800 dark:text-white w-full"
            />
            <Button className="primary ml-0.5 shadow-md text-slate-900 dark:text-white">
              <FaSearch />
            </Button>
          </div>
          <ul className="list-none w-full">
            <li className="px-4 py-2 w-full hover:underline">
              <Link href="/about" onClick={handleMenuClick}>{nav.about}</Link>
              <div className="pt-2">
                <hr className="bg-gray-800 w-full" />
              </div>
            </li>
            <li className="px-4 py-2 w-full hover:underline">
              <Link href="/recipes" onClick={handleMenuClick}>{nav.recipes}</Link>
              <div className="pt-2">
                <hr className="bg-gray-800 w-full" />
              </div>
            </li>
            <li className="px-4 py-2 w-full hover:underline">
              <Link href="/contact" onClick={handleMenuClick}>{nav.contact}</Link>
              <div className="pt-2">
                <hr className="bg-gray-800 w-full" />
              </div>
            </li>
            <li className="px-4 py-2 w-full hover:underline">
              <Link href="/signup" onClick={handleMenuClick}>{nav.signup}</Link>
              <div className="pt-2">
                <hr className="bg-gray-800 w-full" />
              </div>
            </li>
            <li className="px-4 py-2 w-full hover:underline">
              <Link href="/login" onClick={handleMenuClick}>{nav.login}</Link>
              <div className="pt-2">
                <hr className="bg-gray-800 w-full" />
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};