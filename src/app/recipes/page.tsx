import React from "react";
import { NextPage } from "next/types";
import { copy } from "@/copy";

const { description } = copy.recipesPage;

const RecipesPage: NextPage = () => {
    return (
      <section className="flex flex-col items-center">
        <span className="text-2xl mt-20 text-primary-400 font-semibold">{description.heading.top}</span>
        <span className="text-center text-xl mt-8 text-primary-400">{description.heading.bottom}</span>
  
        <div className="grid grid-cols-1 justify-items-center m-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-20 mt-10">
          {description.recipes.map(({ image, title }, idx) => (
            <div key={idx} className="w-full">
              <div className="w-full rounded-lg overflow-hidden shadow-lg">
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              </div>
                <span className="block text-primary-500 mt-4">{title}</span>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default RecipesPage;

// const RecipesPage: NextPage = () => {
//   return (
//     <section className="flex flex-col items-center">
//       <span className="text-2xl mt-20 text-primary-400">{description.heading.top}</span>
//       <span className="text-center text-xl mt-8 ">{description.heading.bottom}</span>

//       <div className="grid grid-cols-1 justify-items-center m-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-10">
//         <div className="w-full">
//           <div className="w-full rounded-lg overflow-hidden shadow-lg">
//             <span className="block text-primary-500 mt-4">{description.recipes.map(({image, title}, idx) => (
//                 <div key={idx}>
//                 <img src={image.src} alt={image.alt} className="w-full h-full object-cover"/>
//                 <span className="block text-primary-500 mt-4">{title}</span>
//               </div>
//             ))}</span>
//                     </div>
//           <div className="flex flex-col">
//             </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default RecipesPage;

{/* <div className="w-full">
  <div className="w-full rounded-lg overflow-hidden shadow-lg">
    <img src="/assets/image copy 6.png" alt="City Image 1" />
  </div>
  <div className="flex flex-col">
    <span className="block text-primary-500 mt-4">Part of the City</span>
  </div>
</div>

<div className="w-full">
  <div className="w-full rounded-lg overflow-hidden shadow-lg">
    <img src="/assets/image copy 6.png" alt="City Image 1" />
  </div>
  <div className="flex flex-col">
    <span className="block text-primary-500 mt-4">Part of the City</span>
  </div>
</div>

<div className="w-full">
  <div className="w-full rounded-lg overflow-hidden shadow-lg">
    <img src="/assets/image copy 6.png" alt="City Image 1" />
  </div>
  <div className="flex flex-col">
    <span className="block text-primary-500 mt-4">Part of the City</span>
  </div>
</div>

<div className="w-full">
  <div className="w-full rounded-lg overflow-hidden shadow-lg">
    <img src="/assets/image copy 6.png" alt="City Image 1" />
  </div>
  <div className="flex flex-col">
    <span className="block text-primary-500 mt-4">Part of the City</span>
  </div>
</div>

<div className="w-full">
  <div className="w-full rounded-lg overflow-hidden shadow-lg">
    <img src="/assets/image copy 6.png" alt="City Image 1" />
  </div>
  <div className="flex flex-col">
    <span className="block text-primary-500 mt-4">Part of the City</span>
  </div>
</div> */}

//sm:w-1/2 md:w-1/3 lg:w-1/3