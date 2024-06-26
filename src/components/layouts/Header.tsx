'use client';

import { Github, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="left-1/2 font-mono -translate-x-1/2 container max-w-6xl z-50 absolute mx-auto">
      <nav className="w-full pt-4 flex justify-between items-center">
        <Link
          title="Trim URL"
          className="flex gap-x-2 text-md sm:text-xl md:text-2xl font-semibold items-center"
          href="/"
        >
          <LinkIcon
            aria-label="Link icon"
            aria-hidden={true}
            className="size-4 md:size-6"
          />
          trim
        </Link>

        <a
          href="https://github.com/johurul-haque/trim-url"
          target="_blank"
          className="sm:p-2 max-sm:flex gap-2 rounded-full sm:hover:bg-slate-200/90 sm:focus-visible:bg-slate-200/90 transition-colors"
          rel="noopener noreferrer"
          title="view source code"
        >
          <Github
            aria-hidden={true}
            strokeWidth={1.7}
            className="size-5 md:size-6"
          />
          <span className="sr-only">view source code</span>
        </a>
      </nav>
    </header>
  );
};
