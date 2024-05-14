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
    </div>
  );
};

export default AboutPage;
