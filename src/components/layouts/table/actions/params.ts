import { toast } from '@/components/ui';
import { SetStateActionType } from '@/types/set-state-action';
import { TableData } from '@/types/table-data';

export type ActionParams = {
  data: {
    shortId: string;
    redirectUrl: string;
    timeStamp: string;
  }[];
  id: string;
  toast: typeof toast;
  setTableData: SetStateActionType<TableData[]>;
};
