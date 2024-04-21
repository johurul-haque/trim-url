import { toast } from '@/components/ui';
import server from '@/config';
import { Scissors } from 'lucide-react';
import { useState } from 'react';

const Form = () => {
  const [count, setCount] = useState(0.5);
  const [state, setState] = useState(true);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast({
      description: 'Your message has been sent.',
    });

    const response = await fetch(server, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: ((e.target as HTMLFormElement).url as HTMLInputElement).value,
      }),
    });
    const data = (await response.json()) as Response;

    if (data) {
      let urlList = [];

      if (!localStorage.getItem('urls')) {
        urlList.unshift({
          shortId: data.id,
          redirectUrl: data.redirectUrl,
          timeStamp: data.timeStamp,
        });

        localStorage.setItem('urls', JSON.stringify(urlList));
      } else {
        urlList = JSON.parse(localStorage.getItem('urls')!) as object[];

        urlList.unshift({
          shortId: data.id,
          redirectUrl: data.redirectUrl,
          timeStamp: data.timeStamp,
        });

        localStorage.setItem('urls', JSON.stringify(urlList));
      }
      setCount(urlList.length);
      setTableData(JSON.parse(localStorage.getItem('urls')!) as []);
    }
  };
  return (
    <form
      className="lg:max-w-2xl md:max-w-xl max-w-md mx-auto"
      onSubmit={(e) => void handleSubmit(e)}
    >
      <div className="sm:text-lg sm:flex gap-4 relative">
        <input
          name="url"
          id="url"
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
  );
};
export default Form;
