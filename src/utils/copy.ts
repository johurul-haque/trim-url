import { toast } from '@/components/ui';
import copy from 'copy-text-to-clipboard';

type CopyUrlParams = {
  path: string;
  toast: typeof toast;
};

export const copyUrl = ({ path, toast }: CopyUrlParams) => {
  copy(window.location.href + path);
  toast({ description: 'Copied to clipboard' });
};
