import { Github, Link as LinkIcon, Shapes } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="left-1/2 font-mono -translate-x-1/2 container max-w-6xl z-50 absolute mx-auto">
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

        <div className="flex items-center">
          <Link
            to={'/collection'}
            className="border-r flex items-center gap-2 pr-4 mr-2 border-gray-400/80"
          >
            <Shapes
              strokeWidth={1.7}
              className="md:h-6 md:w-6 max-sm:h-5 max-sm:w-5"
            />
            collection
          </Link>
          <a
            href="https://github.com/johurul-haque/url-shortener"
            target="_blank"
            className="p-2 rounded-full hover:bg-gray-200/50 transition-colors"
            rel="noopener noreferrer"
          >
            <Github
              strokeWidth={1.7}
              className="md:h-6 md:w-6 max-sm:h-5 max-sm:w-5"
            />
            <span className="sr-only">Source code</span>
          </a>
        </div>
      </nav>
    </header>
  );
};
