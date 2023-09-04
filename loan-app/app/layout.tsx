import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Provider from '@/context/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Loanr | Welcome to the Loaner App',
  description: 'Getting loans is hard. We help you get it easy.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Provider>
        <body className={`${inter.className}`}>{children}</body>
      </Provider>
    </html>
  );
}
