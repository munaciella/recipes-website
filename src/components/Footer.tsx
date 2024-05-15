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
    <footer className="w-full bg-primary-300 flex flex-col md:flex-row justify-between items-center py-2 px-4">
      <div className="relative bottom-0 left-0 ml-2 flex items-center py-2">
        <span className="text-secondary-900">
          Made with <span className="text-red-500">♡</span> by
        </span>
        <img
          className="w-5 ml-2"
          src="/assets/FranIcon.png"
          alt="Francesco's Image"
        />
      </div>
      <h4 className="text-secondary-900">
        &copy; {new Date().getFullYear()} {companyName} {footer.msg}
      </h4>
      <div className="lg:w-[10%] flex justify-between items-center mb-0 md:mb-0 order-first md:order-last">
        {footerLinks.map(({ href, name, icon }, idx) => (
          <div key={href + idx}>
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mr-3 text-2xl text-secondary-800 hover:text-secondary-900"
            >
              {icon}
              <span className="sr-only">{name}</span>
            </Link>
          </div>
        ))}
      </div>
    </footer>
  );
};
