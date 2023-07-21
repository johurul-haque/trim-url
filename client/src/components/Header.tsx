import { Github, Link as LinkIcon, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const toggleMenu = () => {
    document
      .querySelector('#navigation-links')
      ?.classList.toggle('max-sm:scale-0');
  };
  return (
    <header className="left-1/2 font-mono -translate-x-1/2 container max-w-6xl z-[60] absolute mx-auto">
      <nav className="w-full py-4 flex justify-between items-center">
        <Link
          to={'/'}
          title="Link Shortener"
          className="flex gap-x-2 text-lg sm:text-xl md:text-2xl font-semibold items-center"
        >
          <LinkIcon
            aria-label="Link icon"
            className="md:h-6 md:w-6 max-sm:h-5 max-sm:w-5"
          />
          shortener
        </Link>
        <button onClick={toggleMenu} className="sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.7}
            stroke="currentColor"
            className="md:h-6 aspect-square max-sm:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </button>

        <div
          id="navigation-links"
          className="sm:flex max-sm:scale-0 max-sm:origin-top-right max-sm:transition-transform max-sm:absolute top-7 max-sm:rounded max-sm:shadow-2xl max-sm:px-7 max-sm:py-5 max-sm:bg-gradient-to-br from-slate-50 to-slate-100 right-7 items-center"
        >
          <button
            onClick={toggleMenu}
            className="sm:hidden absolute right-3 top-4 ml-auto"
          >
            <X
              strokeWidth={1.7}
              className="aspect-square h-5 hover:stroke-gray-600 stroke-gray-500"
            />
          </button>

          <Link
            to={'/collection'}
            onClick={toggleMenu}
            className="sm:border-r max-sm:mb-3 max-sm:w-full max-sm:border-b max-sm:pb-3 flex items-center gap-2 pr-4 mr-2 max-sm:border-gray-400/60 border-gray-400/80"
          >
            collection
          </Link>
          <a
            href="https://github.com/johurul-haque/url-shortener"
            onClick={toggleMenu}
            target="_blank"
            className="sm:p-2 max-sm:flex gap-2 rounded-full sm:hover:bg-gray-200/50 transition-colors"
            rel="noopener noreferrer"
          >
            <Github
              strokeWidth={1.7}
              className="md:h-6 md:w-6 max-sm:h-5 max-sm:w-5"
            />
            <span className="sm:sr-only">Source code</span>
          </a>
        </div>
      </nav>
    </header>
  );
};
