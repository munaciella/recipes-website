/* eslint-disable @next/next/no-img-element */
"use client";
import { FC, ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";
import { copy } from "@/copy";
import { useTheme } from "next-themes";

const { footer, nav } = copy.common;

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
  const { theme, resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState(nav.logo.src);

  useEffect(() => {
    if (theme === "dark" || resolvedTheme === "dark") {
      setLogoSrc(nav.logo.darkSrc as typeof nav.logo.src);
    } else {
      setLogoSrc(nav.logo.src);
    }
  }, [theme, resolvedTheme]);

  return (
    <footer className="w-full flex flex-col space-y-8 py-6 px-12 mt-20 bg-gradient-to-r from-slate-50 via-white to-slate-100 shadow-lg dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-t border-slate-300 dark:border-slate-700">

      <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">

        <div className="flex flex-col items-center md:items-start space-y-4">
          <Link href="/" className="flex flex-col md:items-start items-center space-x-2">
            <img
              className="w-[24%] scale-150"
              src={logoSrc}
              alt={nav.logo.alt}
            />
          </Link>
          <h4 className="text-gray-700 dark:text-gray-400 md:text-md text-md font-semibold text-center md:text-left">
            &copy; {new Date().getFullYear()} {companyName} {footer.msg}
          </h4>
        </div>

        <div className="flex flex-col items-center md:items-end space-y-4">
          <div className="flex flex-col items-center md:items-end space-y-2">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Follow us
            </h4>
            <div className="flex space-x-4">
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
          </div>

          <div className="flex items-center space-x-2 flex-nowrap space-y-2">
            <span className="text-gray-700 dark:text-gray-200 font-semibold text-lg whitespace-nowrap">
              Made with <span className="text-red-500">♡</span> by
            </span>
            <Link href="https://francesco-dev.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="">
            <img
              className="w-7 h-9"
              src="/assets/FranIcon.png"
              alt="Francesco's Image"
            />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left space-y-4 sm:space-y-0">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <Link href="/privacy-policy" className="hover:underline underline-offset-4">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href="/cookie-policy" className="hover:underline underline-offset-4">
            Cookie Policy
          </Link>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <Link
            href="https://francesco-dev.vercel.app/"
            className="hover:underline underline-offset-4"
            rel="noopener noreferrer"
            target="_blank"
          >
            Developer Website
          </Link>
        </div>
      </div>
    </footer>
  );
};