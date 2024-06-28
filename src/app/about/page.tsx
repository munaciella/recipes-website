import React from 'react';
import { NextPage } from 'next';
import { copy } from '@/copy';
import Link from 'next/link';

const { details } = copy.about;

// const AboutPage: NextPage = () => {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-semibold mb-4 text-center text-primary-500 mt-12">
//         {details.heading}
//       </h1>
//       <p className="text-lg mb-6 text-primary-500 text-center mt-6 leading-relaxed">
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
//             <Link
//               href={href}
//               className="block w-full rounded-lg overflow-hidden shadow-lg mt-8 transition-transform transform hover:scale-105"
//             >
//               <img
//                 src={img.src}
//                 alt={img.alt}
//                 className="w-full h-72 object-cover"
//               />
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


const AboutPage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4 text-center text-primary-500 mt-12">
        {details.heading}
      </h1>
      <p className="text-lg mb-6 text-primary-500 text-center mt-6 leading-relaxed">
        {details.paragraph.split('\n').map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mt-14">
        {details.usefulLinks.map(({ name, href, img }, idx) => (
          <div key={idx} className="w-full">
            <Link href={href} passHref legacyBehavior>
              <a
                className="block w-full rounded-lg overflow-hidden shadow-lg mt-8 transition-transform transform hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-72 object-cover"
                />
              </a>
            </Link>
            <div className="text-secondary-700 font-semibold">
              <span className="block text-primary-500 mt-4 mb-2">{name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
