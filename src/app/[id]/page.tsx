'use client';

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const [error, setError] = useState<unknown>(null);
  const params = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const { data: res } = await axios.get(`/api/${params.id}`);
        router.replace(res.data.redirectUrl);
      } catch (error) {
        setError(error);
      }
    })();
  }, [router, params]);

  return (
    <div className="text-center flex flex-col justify-center items-center h-full">
      <div className="text-6xl md:text-9xl">{error ? '⚠' : '⏱'}</div>

      <h1 className="mt-3 sm:mt-6 font-black text-3xl sm:text-4xl tracking-tighter">
        {error ? 'Oops!' : 'Hold on...'}
      </h1>
      <p className="max-w-56 mt-2 max-sm:text-sm sm:font-medium leading-5 text-neutral-700">
        {error
          ? "Sorry about that. Couldn't find the record!"
          : "👋 What's up? You'll be redirected shortly."}
      </p>
    </div>
  );
}
