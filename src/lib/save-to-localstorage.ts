import { responseSchema } from '@/schema/response';
import { SetStateActionType } from '@/types/set-state-action';
import { TableData } from '@/types/table-data';
import { z } from 'zod';

type ParamsType = {
  data: z.infer<typeof responseSchema>;
  setTableData: SetStateActionType<TableData[]>;
};

export function saveToLocalStorage({ data, setTableData }: ParamsType) {
  let urlList = [];

  const urlListInLocalStorage = localStorage.getItem('urls');

  if (!urlListInLocalStorage) {
    urlList.unshift({
      shortId: data.shortId,
      redirectUrl: data.redirectUrl,
      timeStamp: data.createdAt,
    });
  } else {
    urlList = JSON.parse(urlListInLocalStorage);

    urlList.unshift({
      shortId: data.shortId,
      redirectUrl: data.redirectUrl,
      timeStamp: data.createdAt,
    });
  }

  localStorage.setItem('urls', JSON.stringify(urlList));

  setTableData(urlList);
}
