'use client';
import { Github, Link as LinkIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export const Header = () => {
  let [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <header className="left-1/2 font-mono -translate-x-1/2 container max-w-6xl z-[60] absolute mx-auto">
      <nav className="w-full pt-5 flex justify-between items-center">
        <Link
          title="Link Shortener"
          className="flex gap-x-2 text-lg sm:text-xl md:text-2xl font-semibold items-center"
          href="/"
        >
          <LinkIcon
            aria-label="Link icon"
            aria-hidden={true}
            className="md:h-6 md:w-6 max-sm:h-5 max-sm:w-5"
          />
          shortener
        </Link>
        <button onClick={toggleMenu} className="sm:hidden">
          <span className="sr-only">Open menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.7}
            stroke="currentColor"
            className="aspect-square h-6"
            aria-hidden={true}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </button>
        <div
          className={`${
            isActive ? 'max-sm:scale-100' : 'max-sm:scale-0'
          } sm:flex max-sm:origin-top-right max-sm:transition-transform max-sm:absolute top-7 max-sm:rounded max-sm:shadow-2xl max-sm:pl-7 max-sm:pr-14 max-sm:py-5 max-sm:bg-gradient-to-br from-slate-50 to-slate-100 right-7 items-center`}
        >
          <button
            onClick={toggleMenu}
            className="sm:hidden absolute right-3 top-4 ml-auto"
          >
            <span className="sr-only">Close menu</span>
            <X
              aria-hidden={true}
              strokeWidth={1.7}
              className="aspect-square h-5 hover:stroke-gray-600 stroke-gray-500"
            />
          </button>
          <Link
            className="max-sm:mb-4 max-sm:w-full flex items-center gap-2 sm:mr-4"
            onClick={toggleMenu}
            href="/collection"
          >
            collection
          </Link>
          <a
            href="https://github.com/johurul-haque/url-shortener"
            onClick={toggleMenu}
            target="_blank"
            className="sm:p-2 max-sm:flex gap-2 rounded-full sm:hover:bg-slate-200/90 sm:focus-visible:bg-slate-200/90 transition-colors"
            rel="noopener noreferrer"
            title="source code"
          >
            <Github
              aria-hidden={true}
              strokeWidth={1.7}
              className="md:h-6 md:w-6 max-sm:hidden"
            />
            <span className="sm:sr-only">source code</span>
          </a>
        </div>
      </nav>
    </header>
  );
};
