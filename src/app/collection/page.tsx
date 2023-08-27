'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import server from '@/config';
import { DialogClose } from '@radix-ui/react-dialog';
import copy from 'copy-text-to-clipboard';
import { Copy, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Data {
  shortId: string;
  redirectUrl: string;
  timeStamp: string;
}

interface Response {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: null;
  upsertedCount: number;
  matchedCount: number;
}

export default function Collection() {
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0.5);

  const { toast } = useToast();

  useEffect(() => {
    const urlList = JSON.parse(localStorage.getItem('urls')!) as [];
    setTableData(urlList || []);
  }, [count]);

  const removeItem = async (id: string) => {
    const index = tableData.findIndex(
      ({ shortId }: { shortId: string }) => shortId === id
    );

    if (index > -1) {
      tableData.splice(index, 1);
      localStorage.removeItem('urls');
      localStorage.setItem('urls', JSON.stringify(tableData));
      toast({ description: 'Item removed successfully' });
      setCount(tableData.length);

      await fetch(`${server}/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  };
  const copyUrl = (url: string) => {
    copy(`https://shortesturl.vercel.app/${url}`);
    toast({ description: 'Copied to clipboard' });
  };

  const updateUrl = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const response = await fetch(`${server}/edit/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: ((e.target as HTMLFormElement).newUrl as HTMLInputElement).value,
      }),
    });

    const result = (await response.json()) as Response;

    const index = tableData.findIndex(
      ({ shortId }: { shortId: string }) => shortId === id
    );

    if (index > -1) {
      const currentData: { redirectUrl: string }[] = tableData.splice(index, 1);

      currentData[0].redirectUrl = (
        (e.target as HTMLFormElement).newUrl as HTMLInputElement
      ).value;

      const newTableData = [
        ...tableData.slice(0, index),
        ...currentData,
        ...tableData.slice(index),
      ];

      localStorage.removeItem('urls');
      localStorage.setItem('urls', JSON.stringify(newTableData));
      setCount((prev) => prev + 1);
    }

    if (result.modifiedCount > 0) {
      toast({ description: 'Updated successfully' });
    } else {
      toast({ description: 'Already up to date' });
    }
  };

  return (
    <>
      <Link
        className="mt-5 max-sm:mt-16 max-sm:ml-2 font-mono lowercase font-semibold inline-block"
        href={'/'}
      >
        Back
      </Link>
      <Table className="mx-auto max-w-xl sm:max-w-2xl lg:max-w-4xl my-5">
        <TableCaption>
          {tableData.length > 0
            ? 'A list of your short links.'
            : 'Your collection is currently empty.'}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[130px]">Date Creation</TableHead>
            <TableHead>Short URL</TableHead>
            <TableHead>Redirects to</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((urlInfo: Data) => (
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
                    <Copy
                      aria-hidden={true}
                      className="w-5 h-5 hover:stroke-gray-600 stroke-gray-500"
                    />
                  </button>
                  <Dialog>
                    <DialogTrigger title="Remove from list">
                      <span className="sr-only">Remove from list</span>
                      <Trash2
                        aria-hidden={true}
                        className="w-5 h-5 hover:stroke-gray-600 stroke-gray-500"
                      />
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                        <DialogDescription className="pt-1">
                          This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          onClick={() => void removeItem(urlInfo.shortId)}
                          className="block lowercase font-mono bg-rose-500 hover:bg-rose-400 max-sm:mx-auto ml-auto"
                          variant={'destructive'}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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

                  <Dialog>
                    <DialogTrigger
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
                        aria-hidden={true}
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
                              className="font-mono peer-invalid:pointer-events-none lowercase mt-3 max-sm:mx-auto ml-auto block"
                              type="submit"
                            >
                              Save
                            </Button>
                          </DialogClose>
                        </form>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
