// /* eslint-disable @next/next/no-img-element */
// import React from 'react';
// import { NextPage } from 'next';
// import { copy } from '@/copy';
// import Link from 'next/link';

// const { details } = copy.about;

// const AboutPage: NextPage = () => {

//   return (
//     <div className="container mx-auto px-4 py-8 mt-6">
//       <h1 className="text-4xl font-bold mb-8 text-center text-primary-500 mt-6">
//         {details.heading}
//       </h1>
//       <p className="text-lg mb-6 text-primary-500 text-center mt-8 leading-relaxed">
//         {details.paragraph.split('\n').map((line, idx) => (
//           <React.Fragment key={idx}>
//             {line}
//             <br />
//           </React.Fragment>
//         ))}
//       </p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mt-14">
//         {details.usefulLinks.map(({ name, href, img }, idx) => (
//           <div key={idx} className="w-full">
//             <Link href={href} passHref legacyBehavior>
//               <a
//                 className="block w-full rounded-lg overflow-hidden shadow-lg mt-8 transition-transform transform hover:scale-105"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >

//                 <img
//                   src={img.src}
//                   alt={img.alt}
//                   width={500}
//                   height={288}
//                   className="w-full h-72 object-cover"
//                 />
//               </a>
//             </Link>
//             <div className="text-secondary-700 font-semibold">
//               <span className="block text-primary-500 mt-4 mb-2">{name}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AboutPage;

/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { NextPage } from 'next';
import { copy } from '@/copy';
import Link from 'next/link';

const { details } = copy.about;

const AboutPage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 mt-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary-500 dark:text-primary-300">
        {details.heading}
      </h1>
      <p className="text-lg mb-8 text-center text-secondary-700 dark:text-secondary-300 leading-relaxed max-w-2xl mx-auto">
        {details.paragraph}
      </p>

      <h2 className="text-3xl font-semibold mt-14 text-center text-secondary-700 dark:text-secondary-300 leading-relaxed">
        Click on the links to start your awareness journey
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {details.usefulLinks.map(({ name, href, img }, idx) => (
          <Link href={href} passHref key={idx} legacyBehavior>
            <a
              className="block w-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl p-2 mt-8 transition-transform transform hover:scale-95 dark:border-slate-600 dark:bg-background hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-60 object-cover"
              />
              <div className="p-4 text-center">
                <span className="block text-xl font-semibold text-primary-600 dark:text-primary-400">
                  {name}
                </span>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;


