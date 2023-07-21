import copy from 'copy-text-to-clipboard';
import { Copy, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
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
  shortId: string;
  redirectUrl: string;
  timeStamp: string;
}

export const Collection = () => {
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0.5);

  useEffect(() => {
    const urlList = JSON.parse(localStorage.getItem('urls')!) as [];
    setTableData(urlList || []);
  }, [count]);

  const removeItem = (id: string) => {
    const index = tableData.findIndex(
      ({ shortId }: { shortId: string }) => shortId === id
    );

    if (index > -1) {
      tableData.splice(index, 1);
      localStorage.removeItem('urls');
      localStorage.setItem('urls', JSON.stringify(tableData));
      setCount(tableData.length);
    }
  };
  const copyUrl = (url: string) => {
    copy(`https://shortesturl.vercel.app/${url}`);
  };

  return (
    <>
      <button
        className="mt-5 max-sm:mt-16 max-sm:ml-2 font-mono lowercase font-semibold"
        onClick={() => history.back()}
      >
        Back
      </button>
      <Table className="mx-auto max-w-xl sm:max-w-2xl lg:max-w-4xl my-5">
        <TableCaption>A list of your short links.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[130px]">Date Creation</TableHead>
            <TableHead>Short URL</TableHead>
            <TableHead>Redirects to</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((urlInfo: Data, i) => (
            <TableRow key={urlInfo.shortId}>
              <TableCell>{urlInfo.timeStamp}</TableCell>
              <TableCell className="font-medium justify-between flex items-center gap-4">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://shortesturl.vercel.app/${urlInfo.shortId}`}
                  className="pr-2"
                >
                  <span className="text-gray-500">shortesturl.vercel.app/</span>
                  {urlInfo.shortId}
                </a>

                <div className="border py-2 px-3 bg-opacity-95 rounded bg-slate-100 flex gap-3">
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
                <div className="flex items-center justify-between gap-4">
                  <a
                    href={urlInfo.redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500"
                  >
                    {urlInfo.redirectUrl}
                  </a>

                  <Link
                    to={`/edit/${urlInfo.shortId}`}
                    title="Edit Link"
                    className="border py-2 px-3 bg-opacity-95 rounded bg-slate-100"
                  >
                    <span className="sr-only">Edit Link</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 hover:stroke-gray-600 stroke-gray-500"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
                    </svg>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
