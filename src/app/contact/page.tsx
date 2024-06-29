import React from "react";
import { NextPage } from "next/types";
import { copy } from "@/copy";

const { contactDescription } = copy.contact;

const ContactPage: NextPage = () => {
  const rowsValue: string = "6";
  const rows: number = parseInt(rowsValue);
  return (
    <div className="flex flex-col items-center mt-12 mb-20 mx-auto p-6 w-full">
      <form
        action="https://formspree.io/f/xwkgzngb"
        method="POST"
        className="flex flex-col w-full max-w-md text-primary-400 text-2xl font-semibold rounded-md p-2"
      >
        <div className="flex justify-center mt-4">
          <h1>{contactDescription.heading}</h1>
        </div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="p-2 bg-transparent border-2 rounded-md focus:outline-none mt-6"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="my-2 p-2 bg-transparent border-2 rounded-md focus:outline-none"
        />
        <textarea
          name="message"
          placeholder="Message"
          rows={rows}
          className="p-2 mb-4 bg-transparent border-2 rounded-md focus:outline-none"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="cursor-pointer inline-block px-8 py-3 text-base font-medium rounded-md text-white bg-gradient-to-r from-secondary-300 to-secondary-600 shadow-md hover:from-primary-300 hover:to-primary-600"
          >
            {contactDescription.button}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;