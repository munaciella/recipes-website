/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { NextPage } from "next/types";
import { copy } from "@/copy";

const { description } = copy.home;

const Homepage: NextPage = () => (
  <>
  <main className="w-full lg:mx-6 m-4 max-w-6xl px-6 sm:px-4">
    <div className="flex flex-col md:flex-row items-center md:justify-between md:gap-x-8">
      <div className="max-w-3xl w-full">
        <div className="mx-auto max-w-prose">
          <h1 className="mt-4 block text-left text-3xl font-bold leading-8 tracking-tight text-primary-600 sm:text-4xl lg:text-5xl">
            {description.heading.top}
            <br />
            <span className="text-secondary-600">
              {description.heading.bottom}
            </span>
          </h1>
          <p className="mt-6 text-lg text-left leading-8 text-secondary-500 sm:text-xl lg:text-2xl">
            {description.paragraph}
          </p>
        </div>
      </div>
      <div className="pt-8">
        <img
          className="rounded-xl h-auto max-w-full md:max-w-[40rem] lg:max-w-[48rem] md:h-64 lg:h-72 md:rounded-3xl md:shadow-2xl"
          src={description.img.src}
          alt={description.img.alt}
        />
      </div>
    </div>
  </main>
  </>
);

export default Homepage;
