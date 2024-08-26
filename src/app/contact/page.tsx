import React from "react";
import { NextPage } from "next/types";
import { copy } from "@/copy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const { contactDescription } = copy.contact;

const ContactPage: NextPage = () => {
  const rowsValue: string = "5";
  const rows: number = parseInt(rowsValue);
  return (
    <div className="flex flex-col items-center mt-6 mb-14 mx-auto p-6 w-full">
      <form
        action="https://formspree.io/f/xwkgzngb"
        method="POST"
        className="flex flex-col w-full max-w-md text-primary-400 text-2xl font-semibold rounded-md p-2"
      >
        <div className="flex justify-center mt-4">
          <h1 className="text-4xl">{contactDescription.heading}</h1>
        </div>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          className="p-2 bg-transparent border-2 rounded-md focus:outline-none mt-10"
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          className="my-2 p-2 bg-transparent border-2 rounded-md focus:outline-none"
        />
        <Textarea
          name="message"
          placeholder="Message"
          rows={rows}
          className="p-2 mb-4 bg-transparent border-2 rounded-md focus:outline-none"
        />
        <div className="flex justify-center">
          <Button
            type="submit"
            className="inline-block px-12 py-1 rounded-md text-white dark:text-background shadow-lg"
          >
            {contactDescription.button}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;