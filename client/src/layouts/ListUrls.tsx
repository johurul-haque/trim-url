import copy from 'copy-text-to-clipboard';
import { Copy, MoveRight, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { DialogClose } from '@radix-ui/react-dialog';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/table';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';

interface Data {
  data: {
    shortId: string;
    redirectUrl: string;
    timeStamp: string;
  }[];
  removeItem: (id: string) => void;
}

interface Response {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: null;
  upsertedCount: number;
  matchedCount: number;
}

export const ListUrls = ({ data, removeItem }: Data) => {
  const copyUrl = (url: string) => {
    copy(`https://shortesturl.vercel.app/${url}`);
  };

  const updateUrl = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL as string}/edit/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: ((e.target as HTMLFormElement).newUrl as HTMLInputElement).value,
        }),
      }
    );

    const result = (await response.json()) as Response;
    if (result.modifiedCount > 0) {
      toast.success('Updated successfully');
    } else {
      toast.success('Already up to date');
    }
  };

  return (
    <>
      <Table className="lg:max-w-2xl md:max-w-xl mx-auto mt-5">
        <TableCaption className={`${data.length > 2 ? 'hidden' : ''}`}>
          A list of your short links.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[130px]">Date Creation</TableHead>
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

                <div className="absolute border pt-1 px-3 bg-opacity-95 rounded bg-slate-100 sm:hidden sm:group-hover:block right-0 top-1/2 -translate-y-1/2 space-x-4 sm:space-x-3">
                  <button
                    title="Copy to Clipboard"
                    onClick={() => copyUrl(urlInfo.shortId)}
                    className=""
                  >
                    <span className="sr-only">Copy to clipboard</span>
                    <Copy className="w-5 h-5 hover:stroke-gray-600 stroke-gray-500" />
                  </button>
                  <Dialog>
                    <DialogTrigger title="Remove from list">
                      <span className="sr-only">Remove from list</span>
                      <Trash2 className="w-5 h-5 hover:stroke-gray-600 stroke-gray-500" />
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                        <DialogDescription className="pt-1">
                          This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <Button
                        onClick={() => removeItem(urlInfo.shortId)}
                        className="block lowercase font-mono bg-rose-500 hover:bg-rose-400 ml-auto"
                        variant={'destructive'}
                      >
                        Delete
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
              <TableCell className="group relative">
                <a
                  href={urlInfo.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500"
                >
                  {urlInfo.redirectUrl}
                </a>
                <Dialog>
                  <DialogTrigger
                    title="Edit Link"
                    className="absolute border py-1 px-3 bg-opacity-95 rounded bg-slate-100 sm:hidden sm:group-hover:block right-0 top-1/2 -translate-y-1/2"
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
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update URL</DialogTitle>
                      <DialogDescription>
                        Modify this URL and we would update it for you.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <form
                        className="w-full"
                        onSubmit={(e) => void updateUrl(e, urlInfo.shortId)}
                      >
                        <Input
                          type="url"
                          name="newUrl"
                          placeholder="Enter new URL"
                          className="peer"
                          required
                        />
                        <DialogClose asChild>
                          <Button
                            className="font-mono peer-invalid:pointer-events-none lowercase mt-3 ml-auto block"
                            type="submit"
                          >
                            Save
                          </Button>
                        </DialogClose>
                      </form>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
            : 'max-w-fit flex items-center gap-2 group mt-4 text-center mx-auto'
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
