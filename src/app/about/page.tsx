import React from "react";
import { NextPage } from "next/types";

const Aboutpage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-primary-600">About Us</h1>
      <p className="text-lg mb-6 text-primary-400 text-center">
        Welcome to our vegan recipes website, where we celebrate compassion,
        health, and sustainability. We believe that every meal is an
        opportunity to make a positive impact on the world.
      </p>
      <p className="text-lg mb-6">
        Our recipes are not only delicious but also cruelty-free, meaning they
        contain no animal products. We are passionate about promoting a
        lifestyle that respects all living beings.
      </p>
      <p className="text-lg mb-6">
        As animal lovers, we understand the importance of kindness and empathy
        towards our fellow creatures. That's why our recipes are created with
        love and consideration for animals everywhere.
      </p>
      <p className="text-lg mb-6">
        We are also deeply committed to environmental sustainability. Our
        ingredients are sourced responsibly, and we strive to minimize our
        carbon footprint in every aspect of our operations.
      </p>
      <p className="text-lg">
        Thank you for joining us on this journey towards a healthier, more
        compassionate world. Together, we can make a difference, one delicious
        vegan meal at a time.
      </p>
    </div>
  );
};

export default Aboutpage;
