import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProvider } from './context/AppContext';
import { LanguageProvider } from './providers/LanguageProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TeleMed - Rural Healthcare',
  description: 'Telemedicine app for rural India with offline-first design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" flex items-center justify-center">
        <LanguageProvider>
          <AppProvider>
            <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl min-h-screen">
              {children}
            </div>
          </AppProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}