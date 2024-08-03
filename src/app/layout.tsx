import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Footer, Header } from '@/components';
import { copy } from '@/copy';
import './globals.css';
//import "@/styles/globals.css"
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/ThemeProvider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

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
  <html lang="en" suppressHydrationWarning>
    <body
      className={cn(
        'h-screen w-screen min-h-screen bg-background font-sans antialiased',
        fontSans.variable
      )}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
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
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
