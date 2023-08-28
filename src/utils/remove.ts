import server from '@/config';

const removeUrl = async ({
  id,
  data,
  toast,
  setState,
}: {
  id: string;
  data: {
    shortId: string;
    redirectUrl: string;
    timeStamp: string;
  }[];
  toast: any;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const index = data.findIndex(
    ({ shortId }: { shortId: string }) => shortId === id
  );

  if (index > -1) {
    data.splice(index, 1);
    localStorage.removeItem('urls');
    localStorage.setItem('urls', JSON.stringify(data));
    toast({ description: 'Item removed successfully' });
    setState((prev) => !prev);

    await fetch(`${server}/delete?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export default removeUrl;
