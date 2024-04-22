import { T, toast } from '@/components/ui';
import { SetStateActionType } from '@/types/set-state-action';
import { TableData } from '@/types/table-data';
import { formatDate } from '@/utils/format-date';
import { CopyUrl } from './copy-url';
import { DeleteRow } from './delete-row';
import { UpdateRow } from './update-row';

type TableProps = {
  data: TableData[];
  setTableData: SetStateActionType<TableData[]>;
};

export const Table = ({ data, setTableData }: TableProps) => {
  return (
    <>
      <T.Table className="lg:max-w-2xl md:max-w-xl mx-auto mt-5">
        <T.TableCaption>A list of generated short links.</T.TableCaption>

        <T.TableHeader>
          <T.TableRow>
            <T.TableHead className="min-w-[130px]">Created At</T.TableHead>
            <T.TableHead className="min-w-[250px]">Short URL</T.TableHead>
            <T.TableHead className="min-w-[250px]">Redirects to</T.TableHead>
          </T.TableRow>
        </T.TableHeader>

        <T.TableBody>
          {data.map((url) => (
            <T.TableRow key={url.shortId}>
              <T.TableCell>{formatDate(url.timeStamp)}</T.TableCell>
              <T.TableCell className="font-medium group relative">
                <a
                  href={url.shortId}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pr-16 truncate"
                >
                  <span className="text-gray-500">trimurl.vercel.app/</span>
                  {url.shortId}
                </a>

                <div className="absolute border pt-1 px-3 bg-opacity-95 rounded bg-slate-100 lg:scale-0 lg:group-hover:scale-100 focus-within:scale-100 origin-right transition-transform right-0 top-1/2 -translate-y-1/2 space-x-4 sm:space-x-3">
                  <CopyUrl shortId={url.shortId} toast={toast} />

                  <DeleteRow
                    data={data}
                    id={url.shortId}
                    setTableData={setTableData}
                    toast={toast}
                  />
                </div>
              </T.TableCell>

              <T.TableCell className="group relative">
                <a
                  href={url.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 break-all line-clamp-1 pr-7"
                >
                  {url.redirectUrl}
                </a>

                <UpdateRow
                  data={data}
                  id={url.shortId}
                  setTableData={setTableData}
                  toast={toast}
                />
              </T.TableCell>
            </T.TableRow>
          ))}
        </T.TableBody>
      </T.Table>
    </>
  );
};
