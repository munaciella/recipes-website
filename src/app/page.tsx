/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { NextPage } from "next/types";
import Link from "next/link";
import { copy } from "@/copy";
import { Button } from "@/components/ui/button";

const { description } = copy.home;

const Homepage: NextPage = () => (
  <main className="w-full lg:mx-6 m-4 max-w-6xl px-6 sm:px-4 mt-14 md:mt-8">
    <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between md:gap-x-8">
      <div className="max-w-3xl w-full">
        <div className="mx-auto max-w-prose">
          <h1 className="mt-6 md:mt-28 lg:mt-20 block text-left text-3xl font-bold leading-8 tracking-tight text-primary-600 sm:text-4xl lg:text-5xl">
            {description.heading.top}
            <br />
            <span className="text-secondary-600">
              {description.heading.bottom}
            </span>
          </h1>
          <p className="mt-6 text-lg text-left leading-8 text-secondary-500 sm:text-xl lg:text-2xl">
            {description.paragraph}
          </p>
          <div className="mt-8 flex flex-col space-y-4">
            <Link href="/login" passHref>
              <Button className="w-full md:w-auto">Get Started</Button>
            </Link>
            <Link href="/recipes" passHref>
              <Button variant="outline" className="w-full md:w-auto">
                Browse Recipes
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="pt-2 md:pt-0">
        <img
          className="h-auto max-w-full md:max-w-[40rem] lg:max-w-[50rem] md:h-72 lg:h-96 lg:-mt-16 md:mt-6"
          src={description.img.src}
          alt={description.img.alt}
        />
      </div>
    </div>
  </main>
);

export default Homepage;