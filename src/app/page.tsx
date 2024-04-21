'use client';

import { ListUrls } from '@/components/layouts/list-urls';
import { toast } from '@/components/ui';
import { responseSchema } from '@/schema/response';
import axios from 'axios';
import { Scissors } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  url: string;
};

export default function Home() {
  const [tableData, setTableData] = useState([]);
  const [state, setState] = useState(true);

  const { register, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    const urlList = JSON.parse(localStorage.getItem('urls')!);
    setTableData(urlList || []);
  }, [state]);

  const onSubmit: SubmitHandler<Inputs> = async ({ url }) => {
    try {
      toast({ description: 'Generating your short link' });

      const res = await axios.post('/api', { url });
      const data = responseSchema.parse(res.data);

      // Saving data in local storage
      let urlList = [];

      if (!localStorage.getItem('urls')) {
        urlList.unshift({
          shortId: data.shortId,
          redirectUrl: data.redirectUrl,
          timeStamp: data.createdAt,
        });
      } else {
        urlList = JSON.parse(localStorage.getItem('urls')!);

        urlList.unshift({
          shortId: data.shortId,
          redirectUrl: data.redirectUrl,
          timeStamp: data.createdAt,
        });
      }
      
      localStorage.setItem('urls', JSON.stringify(urlList));

      setState((prev) => !prev);
      setTableData(JSON.parse(localStorage.getItem('urls')!));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="lg:text-7xl mt-[7.5rem] max-[300px]:text-[10vw] max-[300px]:leading-tight sm:tracking-tight text-4xl sm:text-5xl mx-auto text-center uppercase font-bold mb-14 sm:mb-20">
        Make your URL&apos;S look{' '}
        <span className="bg-clip-text bg-gradient-to-br from-gray-500 to-gray-950 to-75% text-transparent">
          Magnificent
        </span>
      </h1>
      <form
        className="lg:max-w-2xl md:max-w-xl max-w-md mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="sm:text-lg sm:flex gap-4 relative">
          <input
            {...register('url')}
            type="url"
            className="block peer max-sm:py-4 sm:placeholder-transparent outline-none rounded-xl border-2 sm:h-16 w-full shadow-2xl px-7 focus:border-gray-400 bg-slate-50 transition-color"
            placeholder="Paste your URL"
            required
          />
          <button className="min-[200px]:shrink-0 max-sm:mx-auto max-sm:mt-3 max-sm:py-3 shadow-xl sm:shadow-2xl font-mono lowercase px-6 bg-gray-900 text-slate-50 rounded-xl border-2 border-transparent hover:bg-gray-700 transition-all ring-gray-600 focus:ring-[3px] outline-none ring-offset-2 flex gap-2 items-center">
            <Scissors
              className="md:h-6 md:w-6 max-sm:h-4 max-sm:w-4"
              strokeWidth={1.7}
              aria-hidden={true}
            />
            Shorten
          </button>
          <label
            htmlFor="url"
            className="absolute max-sm:hidden cursor-text transition-all duration-200 -translate-y-full left-2 pb-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-[1.875rem] peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:pb-0 text-gray-950"
          >
            Paste your URL
          </label>
        </div>
      </form>

      {tableData.length && <ListUrls data={tableData} setState={setState} />}
    </>
  );
}
