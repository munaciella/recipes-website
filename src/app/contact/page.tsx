'use client'
import React, { useState } from "react";
import { NextPage } from "next/types";
import { copy } from "@/copy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const { contactDescription } = copy.contact;

const ContactPage: NextPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const rowsValue: string = "5";
  const rows: number = parseInt(rowsValue);

  const validate = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!formData.message) {
      newErrors.message = "Message cannot be empty.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      e.currentTarget.submit(); // Submit if validation passes
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear the error for the field being updated
  };

  return (
    <div className="flex flex-col items-center mt-12 lg:mt-16 md:mt-20 mb-14 mx-auto p-6 w-full">
      <form
        action="https://formspree.io/f/xwkgzngb"
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md text-primary-400 text-2xl font-semibold rounded-md p-2"
      >
        <div className="flex justify-center mt-4">
          <h1 className="text-4xl">{contactDescription.heading}</h1>
        </div>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className={`p-2 bg-transparent border-2 rounded-md focus:outline-none mt-10 ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={`my-2 p-2 bg-transparent border-2 rounded-md focus:outline-none ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        <Textarea
          name="message"
          placeholder="Message"
          rows={rows}
          value={formData.message}
          onChange={handleChange}
          className={`p-2 mb-4 bg-transparent border-2 rounded-md focus:outline-none ${
            errors.message ? "border-red-500" : ""
          }`}
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
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
