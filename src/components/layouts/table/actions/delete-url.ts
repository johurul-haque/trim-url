import axios from 'axios';
import { ActionParams } from './params';

export async function deleteUrl({ id, data, toast, setState }: ActionParams) {
  const index = data.findIndex(
    ({ shortId }: { shortId: string }) => shortId === id
  );

  if (index > -1) {
    data.splice(index, 1);

    localStorage.removeItem('urls');
    localStorage.setItem('urls', JSON.stringify(data));

    toast({ description: 'Item removed successfully' });
    setState((prev) => !prev);

    await axios.delete('/api/delete', {
      params: { id },
    });
  }
}
