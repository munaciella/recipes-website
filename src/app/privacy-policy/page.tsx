'use client';

import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 mt-14">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary-500 dark:text-primary-300">
        Privacy Policy
      </h1>
      <p className="text-lg mb-8 text-center text-secondary-700 dark:text-secondary-300 leading-relaxed max-w-2xl mx-auto">
        This Privacy Policy describes how we collect, use, and protect your personal information when you use our application or website. By using our services, you agree to the practices described in this policy.
      </p>

      <h2 className="text-2xl font-semibold mt-10 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        Information We Collect
      </h2>
      <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mt-4">
        We may collect the following types of information:
      </p>
      <ul className="list-disc pl-5 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        <li>Personal Information: Name, email address, and any information you provide during account creation or contact.</li>
        <li>Usage Data: Information about how you interact with our app, including device information, IP address, and analytics data.</li>
        <li>Cookies and Tracking Technologies: Details about your preferences and activities on our website.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        How We Use Your Information
      </h2>
      <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mt-4">
        The information we collect is used for the following purposes:
      </p>
      <ul className="list-disc pl-5 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        <li>To provide and improve our services.</li>
        <li>To communicate with you regarding updates, promotions, or support.</li>
        <li>To ensure the security and functionality of our app or website.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        Sharing Your Information
      </h2>
      <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mt-4">
        We do not sell or share your personal information with third parties except in the following cases:
      </p>
      <ul className="list-disc pl-5 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        <li>With your consent.</li>
        <li>To comply with legal obligations, such as responding to a subpoena or regulatory request.</li>
        <li>With service providers who help us operate or improve our services.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        Cookies and Tracking
      </h2>
      <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mt-4">
        We use cookies and similar tracking technologies to enhance user experience and collect data about usage patterns. You can manage your cookie preferences through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-10 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        Data Security
      </h2>
      <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mt-4">
        We implement appropriate security measures to protect your data from unauthorized access, alteration, or disclosure. However, no system is completely secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="text-2xl font-semibold mt-10 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        Your Rights
      </h2>
      <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mt-4">
        Depending on your location, you may have the following rights:
      </p>
      <ul className="list-disc pl-5 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        <li>The right to access, correct, or delete your personal information.</li>
        <li>The right to object to or restrict certain data processing activities.</li>
        <li>The right to withdraw your consent for data processing.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        Third-Party Services
      </h2>
      <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mt-4">
        Our app may contain links to third-party services. We are not responsible for the privacy practices of these services. We recommend reviewing their policies before sharing your data.
      </p>

      <h2 className="text-2xl font-semibold mt-10 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        Changes to This Privacy Policy
      </h2>
      <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mt-4">
        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Please review this policy periodically.
      </p>

      <h2 className="text-2xl font-semibold mt-10 text-secondary-700 dark:text-secondary-300 leading-relaxed">
        Contact Us
      </h2>
      <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mt-4">
        If you have any questions or concerns about this Privacy Policy, please contact us{' '}
        <a
          href="/contact"
          className="text-primary-600 dark:text-primary-400 underline"
        >
          here
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;