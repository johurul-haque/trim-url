import PencilIcon from '@/assets/icons/pencil';
import { Button, D, Input, T, toast } from '@/components/ui';
import server from '@/config';
import { copyUrl, removeUrl, updateUrl } from '@/utils';
import { DialogClose } from '@radix-ui/react-dialog';
import { ChevronRight, Copy, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Data {
  data: {
    shortId: string;
    redirectUrl: string;
    timeStamp: string;
  }[];
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ListUrls = ({ data, setState }: Data) => {
  return (
    <>
      <T.Table className="lg:max-w-2xl md:max-w-xl mx-auto mt-5">
        <T.TableCaption className={`${data.length > 2 ? 'hidden' : ''}`}>
          A list of your short links.
        </T.TableCaption>
        <T.TableHeader>
          <T.TableRow>
            <T.TableHead className="min-w-[130px]">Date Creation</T.TableHead>
            <T.TableHead className="min-w-[250px]">Short URL</T.TableHead>
            <T.TableHead className="min-w-[250px]">Redirects to</T.TableHead>
          </T.TableRow>
        </T.TableHeader>
        <T.TableBody>
          {data.map((urlInfo, i) => (
            <T.TableRow
              key={urlInfo.shortId}
              className={`${i > 1 ? 'hidden' : ''}`}
            >
              <T.TableCell>{urlInfo.timeStamp}</T.TableCell>
              <T.TableCell className="font-medium group relative">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={server + urlInfo.shortId}
                  className="pr-16"
                >
                  <span className="text-gray-500">trimurl.vercel.app/</span>
                  {urlInfo.shortId}
                </a>

                <div className="absolute border pt-1 px-3 bg-opacity-95 rounded bg-slate-100 lg:scale-0 lg:group-hover:scale-100 focus-within:scale-100 origin-right transition-transform right-0 top-1/2 -translate-y-1/2 space-x-4 sm:space-x-3">
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
                          This action is permanent and cannot be undone.
                        </D.DialogDescription>
                      </D.DialogHeader>
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
                    </D.DialogContent>
                  </D.Dialog>
                </div>
              </T.TableCell>
              <T.TableCell className="group relative">
                <a
                  href={urlInfo.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 break-all line-clamp-1 pr-7"
                >
                  {urlInfo.redirectUrl}
                </a>
                <D.Dialog>
                  <D.DialogTrigger
                    title="Edit Link"
                    className="absolute border py-1 px-3 bg-opacity-95 rounded bg-slate-100 lg:scale-0 lg:group-hover:scale-100 focus-visible:scale-100 transition-transform right-0 top-1/2 -translate-y-1/2"
                  >
                    <span className="sr-only">Edit Link</span>
                    <PencilIcon className="w-5 h-5 hover:stroke-gray-600 stroke-gray-500" />
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
                            className="font-mono peer-invalid:pointer-events-none peer-invalid:opacity-70 lowercase mt-3 max-sm:mx-auto ml-auto block focus-visible:ring-gray-500"
                            type="submit"
                          >
                            Save
                          </Button>
                        </DialogClose>
                      </form>
                    </D.DialogFooter>
                  </D.DialogContent>
                </D.Dialog>
              </T.TableCell>
            </T.TableRow>
          ))}
        </T.TableBody>
      </T.Table>
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
