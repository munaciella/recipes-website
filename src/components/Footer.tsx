/* eslint-disable @next/next/no-img-element */
"use client";
import { FC, ReactElement } from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";
import { copy } from "@/copy";

const { footer } = copy.common;

const getIcon = (name: string): ReactElement => {
  switch (name) {
    case "Instagram":
    default:
      return <FaInstagram />;
    case "Threads":
      return <FaThreads />;
    case "X":
      return <FaXTwitter />;
  }
};

const footerLinks = footer.socials.map(({ href, name }) => ({
  href,
  name,
  icon: getIcon(name),
}));

export const Footer: FC<{
  companyName: string;
}> = ({ companyName }) => {
  return (
    <footer className="w-full flex flex-col md:flex-row justify-between items-center py-6 md:py-10 px-8 mt-20 bg-gradient-to-r from-slate-50 via-white to-slate-100 shadow-lg dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-t border-slate-300 dark:border-slate-700">

      <div className="flex items-center space-x-2">
        <span className="text-gray-700 dark:text-gray-200 font-semibold text-lg">
          Made with <span className="text-red-500">♡</span> by
        </span>
        <img
          className="w-5 h-7"
          src="/assets/FranIcon.png"
          alt="Francesco's Image"
        />
      </div>

      <h4 className="text-gray-700 dark:text-gray-400 text-md md:text-md mt-4 md:mt-0 font-semibold">
        &copy; {new Date().getFullYear()} {companyName} {footer.msg}
      </h4>

      <div className="flex space-x-4 mt-4 md:mt-0">
        {footerLinks.map(({ href, name, icon }, idx) => (
          <Link
            key={href + idx}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 dark:text-gray-300 hover:text-slate-900 dark:hover:text-slate-500 transition-colors duration-200 text-2xl"
          >
            {icon}
            <span className="sr-only">{name}</span>
          </Link>
        ))}
      </div>
    </footer>
  );
};
