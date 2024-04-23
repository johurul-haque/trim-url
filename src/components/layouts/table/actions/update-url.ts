import { toast } from '@/components/ui';
import axios from 'axios';
import { ActionParams } from './params';

type UpdateUrlParams = ActionParams & {
  newUrl: string;
};

async function updateUrl({ data, ...params }: UpdateUrlParams) {
  try {
    const { update: updateToast, id } = toast({
      title: '⏱️ Wait...',
      description: 'Might take a while',
    });

    await axios.patch(`/api/${params.id}`, {
      url: params.newUrl,
    });

    const index = data.findIndex(({ shortId }) => shortId === params.id);

    const currentRow = data.splice(index, 1);
    currentRow[0].redirectUrl = params.newUrl;

    const newTableData = [
      ...data.slice(0, index),
      ...currentRow,
      ...data.slice(index),
    ];

    localStorage.setItem('urls', JSON.stringify(newTableData));
    params.setTableData(newTableData);

    updateToast({ title: '🔥 done', description: 'Update successful.', id });
  } catch (error) {
    toast({
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      variant: 'destructive',
    });
  }
}

export default updateUrl;
