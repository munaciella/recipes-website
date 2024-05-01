"use client";
import { FC } from "react";
import { Navbar } from "./Navbar";
import { MobileNavbar } from "./MobileNavbar";
import { useScreenMatcher } from "@/hooks/";

export const Header: FC = () => {
  const { screenMatches } = useScreenMatcher("(min-width: 640px)");
  return (
    <header className="z-40 w-full sticky top-0 flex items-center justify-center bg-white">
      {screenMatches ? <Navbar /> : <MobileNavbar />}
    </header>
  );
};