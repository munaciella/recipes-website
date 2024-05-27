import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Footer, Header } from '@/components';
import { copy } from '@/copy';
import './globals.css';

export const metadata: Metadata = {
  title: 'VeloVegans',
  description: 'Cruelty free recipes',
};

const { footer } = copy.common;

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang="en">
    {/* <link rel="icon" href="/assets/favicon.ico" /> */}
    <body className="h-screen w-screen">
    <link rel="icon" href="/assets/favicon.ico" />
      <div className="h-full max-w-9xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full h-full max-w-8xl flex flex-col items-center justify-between px-2 sm:px-6 lg:px-8">
          <div className="w-full mx-auto flex flex-col items-center justify-between">
            <Header />
            {children}
          </div>
          <Footer companyName={footer.companyName} />
        </div>
      </div>
    </body>
  </html>
);

export default RootLayout;
