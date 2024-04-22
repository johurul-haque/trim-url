import { toast } from '@/components/ui';
import axios from 'axios';
import { ActionParams } from './params';

export async function deleteUrl({ id, data, setTableData }: ActionParams) {
  const index = data.findIndex(({ shortId }) => shortId === id);

  try {
    if (index > -1) {
      await axios.delete(`/api/${id}`);

      data.splice(index, 1);

      localStorage.setItem('urls', JSON.stringify(data));

      toast({ title: '😉 done!', description: 'Successfully deleted.' });
      setTableData([...data]);
    }
  } catch (error) {
    toast({
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      variant: 'destructive',
    });
  }
}
