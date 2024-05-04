/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, FC } from "react";
import Link from "next/link";
import { HiX } from "react-icons/hi";
import { HiBars4 } from "react-icons/hi2";
import { copy } from "@/copy";

const { nav } = copy.common;

export const MobileNavbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="w-full mb-0 mt-0 pt-0 pl-2 grid grid-col-2 sm:hidden grid-flow-col justify-between items-center">
      {isMenuOpen && (
        <ol className="row-start-2 flex flex-col items-start text-primary-700 text-xl">
          <li className="px-2 pb-2 w-full  hover:underline">
            <Link href="/">{nav.home}</Link>
            <div className="pt-2">
              <hr className="bg-gray-800 w-full" />
            </div>
          </li>

          <li className="px-2 pb-2 w-full  hover:underline">
            <Link href="/about">{nav.about}</Link>
            <div className="pt-2">
              <hr className="bg-gray-800 w-full" />
            </div>
          </li>
          <li className="px-2 pb-2 w-full  hover:underline">
            <Link href="/recipes">{nav.recipes}</Link>
            <div className="pt-2">
              <hr className="bg-gray-800 w-full" />
            </div>
          </li>
          <li className="px-2 pb-2 w-full  hover:underline">
            <Link href="/contact">{nav.contact}</Link>
            <div className="pt-2">
              <hr className="bg-gray-800 w-full" />
            </div>
          </li>
        </ol>
      )}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="row-start-1 col-start-1 lg:hidden text-primary-500"
      >
        {isMenuOpen ? (
          <>
            <HiX size={28} /> <span className="sr-only">X button</span>
          </>
        ) : (
          <>
            <HiBars4 size={28} /> <span className="sr-only">Burger button</span>
          </>
        )}
      </button>
      <Link href="/" className="pt-0 row-start-1">
        <img
          className="scale-110 rounded-2xl w-[30%] mb-0 mt-0 mr-4"
          src={nav.logo.src}
          alt={nav.logo.alt}
        />
      </Link>
    </nav>
  );
};
