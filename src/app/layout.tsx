import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Footer, Navbar, MobileNavbar } from '@/components';
import { copy } from '@/copy';
import './globals.css';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ToastProvider } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
import { SupabaseAuthProvider } from '@/context/AuthContext';

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
  children
}: {
  children: ReactNode;
}) => {

  return (

  <html lang="en" suppressHydrationWarning>
    <head>
      <link
        rel="icon"
        type="image/png"
        sizes="180x180"
        href="/assets/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/assets/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/assets/android-chrome-512x512.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/assets/android-chrome-192x192.png"
      />
      <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
    </head>
    <body
      className={cn(
        'h-screen w-screen min-h-screen bg-background font-sans antialiased',
        fontSans.variable
      )}
    >
      <ToastProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
              <SupabaseAuthProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <MobileNavbar />
              <main className="flex-grow mt-20">
                <div className="h-full max-w-9xl px-4 sm:px-6 lg:px-4 py-8 md:py-16">
                  <div className="mx-auto w-full h-full max-w-8xl flex flex-col items-center justify-between px-2 sm:px-6 lg:px-8">
                    <div className="w-full mx-auto flex flex-col items-center justify-between">
                      {children}
                    </div>
                  </div>
                </div>
              </main>
              <Footer companyName={footer.companyName} />
            </div>
        </SupabaseAuthProvider>
        </ThemeProvider>
        <Toaster />
      </ToastProvider>
    </body>
  </html>
);
}

export default RootLayout;