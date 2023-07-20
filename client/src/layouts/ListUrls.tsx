import copy from 'copy-text-to-clipboard';
import { Copy } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/table';

export const ListUrls = () => {
  const copyUrl = (url: string) => {
    copy(`https://shortesturl.vercel.app/${url}`);
  };

  return (
    <Table className="lg:max-w-2xl max-sm:mx-6 md:max-w-xl mx-auto mt-5">
      <TableCaption>A list of your short links.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-36">Date Creation</TableHead>
          <TableHead>Short URL</TableHead>
          <TableHead>Redirects to</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>7/20/2023</TableCell>
          <TableCell className="font-medium group relative">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://shortesturl.vercel.app/${'jQxTtzX5'}`}
              className="pr-5"
            >
              <span className="text-gray-500">shortesturl.vercel.app/</span>
              jQxTtzX5
            </a>
            <button
              onClick={() => copyUrl('jQxTtzX5')}
              className="absolute hidden group-hover:block right-0 top-1/2 -translate-y-1/2"
            >
              <Copy className="w-5 h-5 stroke-gray-500" />
            </button>
          </TableCell>
          <TableCell>
            <a
              href={`https://designnexus.vercel.app/signin`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500"
            >
              designnexus.vercel.app/signin
            </a>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
