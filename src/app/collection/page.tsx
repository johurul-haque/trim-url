'use client';
import { Button, D, Input, T, toast } from '@/components/ui';
import server from '@/config';
import { copyUrl, removeUrl, updateUrl } from '@/utils';
import { DialogClose } from '@radix-ui/react-dialog';
import { Copy, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Data {
  shortId: string;
  redirectUrl: string;
  timeStamp: string;
}

export default function Collection() {
  const [tableData, setTableData] = useState([]);
  const [state, setState] = useState(false);

  useEffect(() => {
    const urlList = JSON.parse(localStorage.getItem('urls')!) as [];
    setTableData(urlList || []);
  }, [state]);

  return (
    <>
      <Link
        className="mt-5 max-sm:mt-16 max-sm:ml-2 font-mono lowercase font-semibold inline-block"
        href={'/'}
      >
        Back
      </Link>
      <T.Table className="mx-auto max-w-xl sm:max-w-2xl lg:max-w-4xl my-5">
        <T.TableCaption>
          {tableData.length > 0
            ? 'A list of your short links.'
            : 'Your collection is currently empty.'}
        </T.TableCaption>
        <T.TableHeader>
          <T.TableRow>
            <T.TableHead className="min-w-[130px]">Date Creation</T.TableHead>
            <T.TableHead>Short URL</T.TableHead>
            <T.TableHead>Redirects to</T.TableHead>
          </T.TableRow>
        </T.TableHeader>
        <T.TableBody>
          {tableData.map((urlInfo: Data) => (
            <T.TableRow key={urlInfo.shortId}>
              <T.TableCell>{urlInfo.timeStamp}</T.TableCell>
              <T.TableCell className="font-medium justify-between flex items-center gap-4">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={server + urlInfo.shortId}
                  className="pr-2"
                >
                  <span className="text-gray-500">trimurl.vercel.app/</span>
                  {urlInfo.shortId}
                </a>

                <div className="border py-2 px-3 bg-opacity-95 rounded bg-slate-100 flex gap-3">
                  <button
                    title="Copy to Clipboard"
                    onClick={() => copyUrl({ path: urlInfo.shortId, toast })}
                  >
                    <span className="sr-only">Copy to clipboard</span>
                    <Copy
                      aria-hidden={true}
                      className="w-5 h-5 hover:stroke-gray-600 stroke-gray-500"
                    />
                  </button>
                  <D.Dialog>
                    <D.DialogTrigger title="Remove from list">
                      <span className="sr-only">Remove from list</span>
                      <Trash2
                        aria-hidden={true}
                        className="w-5 h-5 hover:stroke-gray-600 stroke-gray-500"
                      />
                    </D.DialogTrigger>

                    <D.DialogContent>
                      <D.DialogHeader>
                        <D.DialogTitle>Are you absolutely sure?</D.DialogTitle>
                        <D.DialogDescription className="pt-1">
                          This action cannot be undone.
                        </D.DialogDescription>
                      </D.DialogHeader>
                      <D.DialogFooter>
                        <Button
                          onClick={() =>
                            void removeUrl({
                              id: urlInfo.shortId,
                              data: tableData,
                              setState,
                              toast,
                            })
                          }
                          className="block lowercase font-mono bg-rose-500 hover:bg-rose-400 focus-visible:ring-rose-300 max-sm:mx-auto ml-auto"
                          variant={'destructive'}
                        >
                          Delete
                        </Button>
                      </D.DialogFooter>
                    </D.DialogContent>
                  </D.Dialog>
                </div>
              </T.TableCell>

              <T.TableCell>
                <div className="flex items-center justify-between gap-4">
                  <a
                    href={urlInfo.redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500"
                  >
                    {urlInfo.redirectUrl}
                  </a>

                  <D.Dialog>
                    <D.DialogTrigger
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
                    </D.DialogTrigger>
                    <D.DialogContent>
                      <D.DialogHeader>
                        <D.DialogTitle>Update URL</D.DialogTitle>
                        <D.DialogDescription>
                          Modify this URL and we would update it for you.
                        </D.DialogDescription>
                      </D.DialogHeader>
                      <D.DialogFooter>
                        <form
                          className="w-full"
                          onSubmit={(e) =>
                            void updateUrl({
                              e,
                              id: urlInfo.shortId,
                              data: tableData,
                              setState,
                              toast,
                            })
                          }
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
                      </D.DialogFooter>
                    </D.DialogContent>
                  </D.Dialog>
                </div>
              </T.TableCell>
            </T.TableRow>
          ))}
        </T.TableBody>
      </T.Table>
    </>
  );
}
