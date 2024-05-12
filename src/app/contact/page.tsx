import React from "react";
import { NextPage } from "next/types";
import { copy } from "@/copy";

const { description } = copy.contact;

const Contactpage: NextPage = () => {
    const rowsValue: string = '6'
    const rows: number = parseInt(rowsValue)
  return (
    <div className="flex flex-col mt-4 mb-20 mx-auto p-6">
      <div className="flex justify-center items-center">
        <form 
        action="https://getform.io/f/lejxRBbj"
        method="POST"
        className='flex flex-col w-full md:w-7/12'
        >
            <span>{description.heading}</span>
            <input 
            type="text" 
            name='name'
            placeholder='Name'
            className='p-2 bg-transparent border-2 rounded-md focus:outline-none text-secondary-400'
            />
            <input 
            type="email" 
            name='email'
            placeholder='Email'
            className='my-2 p-2 bg-transparent border-2 rounded-md focus:outline-none'
            />
            <textarea
            name="message" 
            placeholder="Message" 
            rows={rows}
            className='p-2 mb-4 bg-transparent border-2 rounded-md focus:outline-none'
            />
            <button 
            type='submit' 
            className='cursor-pointer text-center inline-block px-8 py-3 w-max text-base font-medium rounded-md text-white bg-gradient-to-r from-secondary-300 to-secondary-600 drop-shadow-md hover:from-primary-300 hover:to-primary-600'>
                {description.button}
            </button>
        </form>
      </div>
    </div>
  );
};

export default Contactpage;