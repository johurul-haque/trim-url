import copy from 'copy-text-to-clipboard';
import { Copy, MoveRight, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/table';

interface Data {
  data: {
    shortId: string;
    redirectUrl: string;
    timeStamp: string;
  }[];
  removeItem: (id: string) => void;
}

export const ListUrls = ({ data, removeItem }: Data) => {
  const copyUrl = (url: string) => {
    copy(`https://shortesturl.vercel.app/${url}`);
  };

  return (
    <>
      <Table className="lg:max-w-2xl md:max-w-xl mx-auto mt-5">
        <TableCaption className={`${data.length > 2 ? 'hidden' : ''}`}>
          A list of your short links.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-36">Date Creation</TableHead>
            <TableHead>Short URL</TableHead>
            <TableHead>Redirects to</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((urlInfo, i) => (
            <TableRow
              key={urlInfo.shortId}
              className={`${i > 1 ? 'hidden' : ''}`}
            >
              <TableCell>{urlInfo.timeStamp}</TableCell>
              <TableCell className="font-medium group relative">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://shortesturl.vercel.app/${urlInfo.shortId}`}
                  className="pr-2"
                >
                  <span className="text-gray-500">shortesturl.vercel.app/</span>
                  {urlInfo.shortId}
                </a>

                <div className="absolute px-3 bg-opacity-90 rounded bg-slate-100 sm:hidden sm:group-hover:block right-0 top-1/2 -translate-y-1/2 space-x-2">
                  <button
                    title="Copy to Clipboard"
                    onClick={() => copyUrl(urlInfo.shortId)}
                    className=""
                  >
                    <span className="sr-only">Copy to clipboard</span>
                    <Copy className="w-5 h-5 hover:stroke-gray-600 stroke-gray-500" />
                  </button>
                  <button
                    title="Remove from list"
                    onClick={() => removeItem(urlInfo.shortId)}
                  >
                    <span className="sr-only">Remove from list</span>
                    <Trash2 className="w-5 h-5 hover:stroke-gray-600 stroke-gray-500" />
                  </button>
                </div>
              </TableCell>
              <TableCell>
                <a
                  href={urlInfo.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500"
                >
                  {urlInfo.redirectUrl}
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        to={'/collection'}
        className={`${
          data.length < 3
            ? 'hidden'
            : 'max-w-fit flex items-center gap-2 group my-4 text-center mx-auto'
        }`}
      >
        <div>
          View full list in <span className="font-mono">collection</span>
        </div>
        <MoveRight className="stroke-gray-500 group-hover:translate-x-2 transition-transform" />
      </Link>
    </>
  );
};
