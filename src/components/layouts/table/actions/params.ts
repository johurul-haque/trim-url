import { toast } from '@/components/ui';
import { SetStateActionType } from '@/types/set-state-action';

export type ActionParams = {
  data: {
    shortId: string;
    redirectUrl: string;
    timeStamp: string;
  }[];
  id: string;
  toast: typeof toast;
  setState: SetStateActionType<boolean>;
};
