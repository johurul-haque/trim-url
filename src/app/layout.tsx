import pattern from '@/assets/pattern.svg';
import { Header } from '@/components/layouts/Header';
import { Toaster } from '@/components/ui';
import { Gradients } from '@/components/ui/gradients';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'URL Shortener',
  description:
    'An open-source link shortening website that allows users to beautify their URLs for easy sharing.',
  authors: [{ name: 'Johurul Haque', url: 'https://johurulhaque.vercel.app/' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./icon.svg" type="image/svg" sizes="any" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="text-gray-950 flex-1 flex flex-col">
          <section className="flex-1 overflow-y-hidden flex flex-col relative w-full overflow-x-clip bg-slate-50 bg-gradient-to-t from-slate-50 to-slate-100 sm:pt-20">
            <Gradients />
            <div className="sm:container max-w-6xl flex-1 flex flex-col">
              <div
                className="p-4 relative flex-1 z-50 bg-opacity-60 sm:px-14 rounded-t-lg shadow-[2px_8px_30px_-8px_rgba(0,0,0,0.25)]"
                style={{
                  backgroundImage: `url(${pattern.src})`,
                }}
              >
                {children}
                <Toaster />
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
