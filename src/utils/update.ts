import server from '@/config';

interface Response {
  modifiedCount: number;
}

const updateUrl = async ({
  e,
  data,
  id,
  toast,
  setState,
}: {
  e: React.FormEvent<HTMLFormElement>;
  data: {
    shortId: string;
    redirectUrl: string;
    timeStamp: string;
  }[];
  id: string;
  toast: any;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  e.preventDefault();

  const response = await fetch(server + `edit?id=${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: ((e.target as HTMLFormElement).newUrl as HTMLInputElement).value,
    }),
  });

  const result = (await response.json()) as Response;
  const index = data.findIndex(
    ({ shortId }: { shortId: string }) => shortId === id
  );

  if (index > -1) {
    const currentData: { redirectUrl: string }[] = data.splice(index, 1);

    currentData[0].redirectUrl = (
      (e.target as HTMLFormElement).newUrl as HTMLInputElement
    ).value;

    const newTableData = [
      ...data.slice(0, index),
      ...currentData,
      ...data.slice(index),
    ];

    localStorage.removeItem('urls');
    localStorage.setItem('urls', JSON.stringify(newTableData));
    setState((prev) => !prev);
  }

  if (result.modifiedCount > 0) {
    toast({ description: 'Updated successfully' });
  } else {
    toast({ description: 'Already up to date' });
  }
};

export default updateUrl;
