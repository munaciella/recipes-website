// import React from "react";
// import { NextPage } from "next/types";
// import { copy } from "@/copy";

// const { description } = copy.about;

// const AboutPage: NextPage = () => {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-semibold mb-4 text-center text-primary-500 mt-12">
//         {description.heading}
//       </h1>
//       <p className="text-lg mb-6 text-primary-500 text-center mt-6">
//         {description.paragraph}
//       </p>
//     </div>
//   );
// };

// export default AboutPage;

import React from 'react';
import { NextPage } from 'next/types';
import { copy } from '@/copy';

const { description } = copy.about;

const AboutPage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4 text-center text-primary-500 mt-12">
        {description.heading}
      </h1>
      <p className="text-lg mb-6 text-primary-500 text-center mt-6">
        {description.paragraph}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mt-20">
        <div>
          <span className="text-xl font-semibold mb-4 text-primary-500 mt-8">
            Placeholder Title
          </span>
          <a href="/your-redirect-url" className="text-secondary-700 hover:underline">
            <img
              src="/placeholder-image1.jpg"
              alt="Placeholder Link 1 Image"
              className="mx-auto mt-4"
              style={{ width: '150px', height: '100px' }}
            />
          </a>
        </div>
        <div>
          <span className="text-xl font-semibold mb-4 text-primary-500 mt-8">
            Placeholder Title
          </span>
          <a href="/your-redirect-url" className="text-secondary-700 hover:underline">
            <img
              src="/placeholder-image2.jpg"
              alt="Placeholder Link 2 Image"
              className="mx-auto mt-4"
              style={{ width: '150px', height: '100px' }}
            />
          </a>
        </div>
        <div>
          <span className="text-xl font-semibold mb-4 text-primary-500 mt-8">
            Placeholder Title
          </span>
          <a href="/your-redirect-url" className="text-secondary-700 hover:underline">
            <img
              src="/placeholder-image3.jpg"
              alt="Placeholder Link 3 Image"
              className="mx-auto mt-4"
              style={{ width: '150px', height: '100px' }}
            />
          </a>
        </div>
        <div>
          <span className="text-xl font-semibold mb-4 text-primary-500 mt-8">
            Placeholder Title
          </span>
          <a href="/your-redirect-url" className="text-secondary-700 hover:underline">
            <img
              src="/placeholder-image4.jpg"
              alt="Placeholder Link 4 Image"
              className="mx-auto  mt-4"
              style={{ width: '150px', height: '100px' }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

