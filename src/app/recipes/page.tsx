import React from "react";
import { NextPage } from "next/types";

const Recipespage: NextPage = () => {
  return (
    <section className="flex flex-col items-center">
      <span className="text-md mt-10">Country</span>
      <span className="text-2xl mt-4">City Name</span>
      <span className="text-md mt-5">Description</span>

      <div className="grid grid-cols-1 justify-items-center m-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
        <div className="w-full">
          <div className="w-full rounded-lg overflow-hidden shadow-lg">
            <img src="/assets/image copy 6.png" alt="City Image 1" />
          </div>
          <div className="flex flex-col">
            <span className="block text-gray-700 mt-4">Part of the City</span>
            <span className="text-gray-500">City Name</span>
            <span className="text-gray-500">Author Name</span>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full rounded-lg overflow-hidden shadow-lg">
            <img src="/assets/image copy 6.png" alt="City Image 1" />
          </div>
          <div className="flex flex-col">
            <span className="block text-gray-700 mt-4">Part of the City</span>
            <span className="text-gray-500">City Name</span>
            <span className="text-gray-500">Author Name</span>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full rounded-lg overflow-hidden shadow-lg">
            <img src="/assets/image copy 6.png" alt="City Image 1" />
          </div>
          <div className="flex flex-col">
            <span className="block text-gray-700 mt-4">Part of the City</span>
            <span className="text-gray-500">City Name</span>
            <span className="text-gray-500">Author Name</span>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full rounded-lg overflow-hidden shadow-lg">
            <img src="/assets/image copy 6.png" alt="City Image 1" />
          </div>
          <div className="flex flex-col">
            <span className="block text-gray-700 mt-4">Part of the City</span>
            <span className="text-gray-500">City Name</span>
            <span className="text-gray-500">Author Name</span>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full rounded-lg overflow-hidden shadow-lg">
            <img src="/assets/image copy 6.png" alt="City Image 1" />
          </div>
          <div className="flex flex-col">
            <span className="block text-gray-700 mt-4">Part of the City</span>
            <span className="text-gray-500">City Name</span>
            <span className="text-gray-500">Author Name</span>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full rounded-lg overflow-hidden shadow-lg">
            <img src="/assets/image copy 6.png" alt="City Image 1" />
          </div>
          <div className="flex flex-col">
            <span className="block text-gray-700 mt-4">Part of the City</span>
            <span className="text-gray-500">City Name</span>
            <span className="text-gray-500">Author Name</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recipespage;

//sm:w-1/2 md:w-1/3 lg:w-1/3