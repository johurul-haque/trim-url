import axios from 'axios';
import { ActionParams } from './params';

type UpdateUrlParams = ActionParams & {
  newUrl: string;
};

async function updateUrl({ data, ...params }: UpdateUrlParams) {
  const { data: res } = await axios.patch(
    '/api/edit',
    { url: params.newUrl },
    { params: { id: params.id } }
  );

  const index = data.findIndex(({ shortId }) => shortId === params.id);

  if (index > -1) {
    const currentData = data.splice(index, 1);

    currentData[0].redirectUrl = params.newUrl;

    const newTableData = [
      ...data.slice(0, index),
      ...currentData,
      ...data.slice(index),
    ];

    localStorage.removeItem('urls');
    localStorage.setItem('urls', JSON.stringify(newTableData));

    params.setState((prev) => !prev);
  }

  if (res.modifiedCount > 0) {
    params.toast({ description: 'Updated successfully' });
  } else {
    params.toast({ description: 'Already up to date' });
  }
}

export default updateUrl;
