/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';

const CookiePolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 mt-14">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary-500 dark:text-primary-300">
        Cookie Policy
      </h1>
      <p className="text-lg mb-8 text-center text-secondary-700 dark:text-secondary-300 leading-relaxed max-w-2xl mx-auto">
        We value your privacy and are committed to being transparent about how we use cookies. This Cookie Policy explains what cookies are, how they function, and how you can manage them.
      </p>
      <h2 className="text-2xl font-semibold mt-10 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        What Are Cookies?
      </h2>
      <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mt-4">
        Cookies are small text files stored on your device when you visit a website. They serve various purposes, such as enabling website functionality, enhancing performance, and personalizing your experience.
      </p>
      <h2 className="text-2xl font-semibold mt-10 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        Types of Cookies We Use
      </h2>
      <ul className="list-disc list-inside mt-4 text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
        <li>
          <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly and cannot be disabled.
        </li>
        <li>
          <strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
        </li>
        <li>
          <strong>Functionality Cookies:</strong> These cookies allow us to remember your preferences and settings, improving your user experience.
        </li>
        <li>
          <strong>Advertising Cookies (if applicable):</strong> These cookies are used to deliver relevant ads and track ad campaign performance.
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mt-10 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        How We Use Cookies
      </h2>
      <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mt-4">
        We use cookies to improve our website's functionality, analyze performance, and deliver personalized experiences. Cookies help us understand how you interact with the site so we can enhance your overall experience.
      </p>
      <h2 className="text-2xl font-semibold mt-10 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        Managing Cookies
      </h2>
      <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mt-4">
        You have the option to manage your cookie preferences through your browser settings. Please note that disabling cookies may impact the functionality of our website.
      </p>
      <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mt-4">
        For more information on managing cookies, visit:
        <a
          href="https://www.allaboutcookies.org/manage-cookies/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 dark:text-primary-400 underline ml-1"
        >
          All About Cookies
        </a>
      </p>
      <h2 className="text-2xl font-semibold mt-10 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        Updates to This Cookie Policy
      </h2>
      <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mt-4">
        We may update this Cookie Policy from time to time to reflect changes in technology, legal requirements, or our practices. Please check back periodically for updates.
      </p>
      <h2 className="text-2xl font-semibold mt-10 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        Contact Us
      </h2>
      <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mt-4">
        If you have any questions or concerns about this Cookie Policy, please contact us 
        <a
          href="/contact"
          className="text-primary-600 dark:text-primary-400 underline ml-1"
        >
          here
        </a>
        .
      </p>
    </div>
  );
};

export default CookiePolicyPage;