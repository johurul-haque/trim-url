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
import { removeUrl, updateUrl } from '@/utils';
import { DialogClose } from '@radix-ui/react-dialog';
import copy from 'copy-text-to-clipboard';
import { ChevronRight, Copy, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';

interface Data {
  data: {
    shortId: string;
    redirectUrl: string;
    timeStamp: string;
  }[];
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ListUrls = ({ data, setState }: Data) => {
  const { toast } = useToast();

  const copyUrl = (id: string) => {
    copy(server + '/' + id);
    toast({ description: 'Copied to clipboard' });
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
            <TableHead className="min-w-[250px]">Short URL</TableHead>
            <TableHead className="min-w-[250px]">Redirects to</TableHead>
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
                  href={server + '/' + urlInfo.shortId}
                  className="pr-2"
                >
                  <span className="text-gray-500">trimurl.vercel.app/</span>
                  {urlInfo.shortId}
                </a>

                <div className="absolute border pt-1 px-3 bg-opacity-95 rounded bg-slate-100 sm:scale-0 sm:group-hover:scale-100 focus-within:scale-100 origin-right transition-transform right-0 top-1/2 -translate-y-1/2 space-x-4 sm:space-x-3">
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
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription className="pt-1">
                          This action is permanent and cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <Button
                        onClick={() =>
                          void removeUrl({
                            id: urlInfo.shortId,
                            data,
                            setState,
                            toast,
                          })
                        }
                        className="block lowercase font-mono bg-rose-500 hover:bg-rose-400 max-sm:mx-auto ml-auto focus-visible:ring-rose-300"
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
                  className="text-gray-500 break-all line-clamp-1"
                >
                  {urlInfo.redirectUrl}
                </a>
                <Dialog>
                  <DialogTrigger
                    title="Edit Link"
                    className="absolute border py-1 px-3 bg-opacity-95 rounded bg-slate-100 sm:scale-0 sm:group-hover:scale-100 focus-visible:scale-100 transition-transform right-0 top-1/2 -translate-y-1/2"
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
                        onSubmit={(e) =>
                          void updateUrl({
                            e,
                            id: urlInfo.shortId,
                            toast,
                            data,
                            setState,
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
                            className="font-mono peer-invalid:pointer-events-none lowercase mt-3 max-sm:mx-auto ml-auto block focus-visible:ring-gray-500"
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
        href={'/collection'}
        className={`${
          data.length < 3
            ? 'hidden'
            : 'max-w-fit flex items-center gap-2 group mt-4 text-center mx-auto font-mono'
        }`}
      >
        <span className="sr-only">view full list in </span>collection
        <ChevronRight
          aria-hidden={true}
          className="stroke-gray-500 group-hover:translate-x-2 transition-transform"
          strokeWidth={1.7}
        />
      </Link>
    </>
  );
};
