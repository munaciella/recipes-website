import React from "react";
import { NextPage } from "next/types";

const Contactpage: NextPage = () => {
    const rowsValue: string = '6'
    const rows: number = parseInt(rowsValue)
  return (
    <div className="flex flex-col mb-20 mx-auto p-5">
      <div className="flex justify-center items-center">
        <form 
        action="https://getform.io/f/lejxRBbj"
        method="POST"
        className='flex flex-col w-full md:w-7/12'
        >
            <h1>Contact</h1>
            <input 
            type="text" 
            name='name'
            placeholder='Name'
            className='p-2 bg-transparent border-2 rounded-md focus:outline-none'
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
            className='cursor-pointer text-center inline-block px-8 py-3 w-max text-base font-medium rounded-md text-white bg-gradient-to-r from-yellow-300 to-orange-600 drop-shadow-md hover:from-yellow-600 hover:to-orange-600'>
                Work With Me
            </button>
        </form>
      </div>
    </div>
  );
};

export default Contactpage;