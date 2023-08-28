import server from '@/config';
import copy from 'copy-text-to-clipboard';

const copyUrl = ({ path, toast }: { path: string; toast: any }) => {
  copy(server + path);
  toast({ description: 'Copied to clipboard' });
};

export default copyUrl