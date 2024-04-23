import { toast } from '@/components/ui';
import axios from 'axios';
import { ActionParams } from './params';

export async function deleteUrl({ id, data, setTableData }: ActionParams) {
  const index = data.findIndex(({ shortId }) => shortId === id);

  try {
      const { update: updateToast, id: toastId } = toast({
        title: '⏱️ Wait...',
        description: 'Processing your request',
      });
      await axios.delete(`/api/${id}`);

      data.splice(index, 1);

      localStorage.setItem('urls', JSON.stringify(data));

      updateToast({
        title: '😉 done!',
        description: 'Successfully removed.',
        id: toastId,
      });
      setTableData([...data]);
  } catch (error) {
    toast({
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      variant: 'destructive',
    });
  }
}
