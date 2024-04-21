import { T, toast } from '@/components/ui';
import server from '@/config';
import { SetStateActionType } from '@/types/set-state-action';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { CopyUrl } from './table/copy-url';
import { DeleteRow } from './table/delete-row';
import { UpdateRow } from './table/update-row';

interface ListUrlsProps {
  data: {
    shortId: string;
    redirectUrl: string;
    timeStamp: string;
  }[];
  setState: SetStateActionType<boolean>;
}

export const ListUrls = ({ data, setState }: ListUrlsProps) => {
  return (
    <>
      <T.Table className="lg:max-w-2xl md:max-w-xl mx-auto mt-5">
        <T.TableCaption className={`${data.length > 2 ? 'hidden' : ''}`}>
          A list of your short links.
        </T.TableCaption>
        <T.TableHeader>
          <T.TableRow>
            <T.TableHead className="min-w-[130px]">Created At</T.TableHead>
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
                  <CopyUrl shortId={urlInfo.shortId} toast={toast} />

                  <DeleteRow
                    data={data}
                    id={urlInfo.shortId}
                    setState={setState}
                    toast={toast}
                  />
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

                <UpdateRow
                  data={data}
                  id={urlInfo.shortId}
                  setState={setState}
                  toast={toast}
                />
              </T.TableCell>
            </T.TableRow>
          ))}
        </T.TableBody>
      </T.Table>

      {data.length < 3 && (
        <Link
          href={'/collection'}
          className={
            'max-w-fit flex items-center gap-2 group mt-4 text-center mx-auto font-mono'
          }
        >
          view all
          <ChevronRight
            aria-hidden={true}
            className="stroke-gray-500 group-hover:translate-x-2 transition-transform size-5"
            strokeWidth={1.7}
          />
        </Link>
      )}
    </>
  );
};
