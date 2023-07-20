import { Scissors } from 'lucide-react';
import { useEffect, useState } from 'react';
import pattern from '../assets/images/pattern.svg';
import { Header } from '../components/Header';
import { ListUrls } from '../layouts/ListUrls';

interface Response {
  status: number;
  id: string;
  redirectUrl: string;
  timeStamp: string;
}

function App() {
  const [showTable, setShowTable] = useState(false);
  const urlList = localStorage.getItem('urls');

  useEffect(() => {
    if (urlList) {
      setShowTable(true);
    }
  }, [showTable, urlList]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(import.meta.env.VITE_SERVER_URL as URL, {
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
        urlList.push({
          shortId: data.id,
          redirectUrl: data.redirectUrl,
          timeStamp: data.timeStamp,
        });

        localStorage.setItem('urls', JSON.stringify(urlList));
      } else {
        urlList = JSON.parse(localStorage.getItem('urls')!) as any[];

        urlList.push({
          shortId: data.id,
          redirectUrl: data.redirectUrl,
          timeStamp: data.timeStamp,
        });

        localStorage.setItem('urls', JSON.stringify(urlList));
      }
      setShowTable(true);
    }
  };

  return (
    <>
      <Header />
      <main className="text-gray-950 flex-1 flex flex-col ring">
        <section className="flex-1 overflow-y-hidden flex flex-col relative w-full overflow-x-clip bg-slate-50 bg-gradient-to-t from-slate-50 to-slate-100 pt-20">
          <div className="absolute h-16 w-[600px] rotate-[-40deg] rounded-3xl bg-sky-400 opacity-10 blur-2xl filter lg:bottom-24 lg:-left-28 lg:h-12 lg:w-[600px] lg:opacity-30 lg:blur-2xl xl:-left-40 xl:h-4 xl:w-[700px] xl:opacity-100"></div>

          <div className="absolute h-14 w-[600px] rotate-[-40deg] rounded-3xl bg-purple-400 opacity-30 blur-2xl filter lg:bottom-20 lg:-left-28 lg:h-10 lg:w-[600px] lg:opacity-20 lg:blur-xl xl:-left-40 xl:h-2 xl:w-[800px] xl:opacity-100"></div>

          <div className="absolute hidden h-16 w-[600px] rotate-[-40deg] rounded-3xl bg-sky-400 opacity-10 blur-2xl filter lg:top-24 lg:-right-28 lg:block lg:h-12 lg:w-[600px] lg:opacity-30 lg:blur-2xl xl:-right-40 xl:h-4 xl:w-[700px] xl:opacity-100"></div>

          <div className="absolute hidden h-14 w-[600px] rotate-[-40deg] rounded-3xl bg-purple-400 opacity-30 blur-2xl filter lg:top-20 lg:-right-28 lg:block lg:h-10 lg:w-[600px] lg:opacity-20 lg:blur-xl xl:-right-40 xl:h-2 xl:w-[800px] xl:opacity-100"></div>

          <div className="container max-w-6xl flex-1 flex flex-col">
            <div
              className={`p-4 relative flex-1 z-50 bg-opacity-60 sm:px-14 rounded-t-lg shadow-[2px_8px_30px_-8px_rgba(0,0,0,0.25)] pt-16 sm:pt-32`}
              style={{
                backgroundImage: `url(${pattern})`,
              }}
            >
              <h1 className="lg:text-6xl sm:tracking-tight text-4xl sm:text-5xl mx-auto text-center uppercase font-bold mb-20">
                Make your URL'S look{' '}
                <span className="bg-clip-text bg-gradient-to-br from-gray-950 to-gray-500 from-35% text-transparent">
                  Magnificent
                </span>
              </h1>

              <form
                className="lg:max-w-2xl max-sm:mx-6 md:max-w-xl mx-auto"
                onSubmit={(e) => void handleSubmit(e)}
              >
                <div className="text-lg flex gap-4 relative">
                  <input
                    name="url"
                    id="url"
                    type="url"
                    className="block peer placeholder-transparent outline-none rounded-xl border-2 h-16 w-full shadow-2xl px-7 focus:border-gray-400 bg-slate-50 transition-color"
                    placeholder="Paste your URL"
                    required
                  />
                  <button className="shrink-0 shadow-xl sm:shadow-2xl font-mono lowercase px-6 bg-gray-900 text-slate-50 rounded-xl border-2 border-transparent hover:bg-gray-700 transition-all ring-gray-600 focus:ring-[3px] outline-none ring-offset-2 flex gap-2 items-center">
                    <Scissors
                      className="md:h-6 md:w-6 max-sm:h-5 max-sm:w-5"
                      strokeWidth={1.7}
                    />
                    Shorten
                  </button>
                  <label
                    htmlFor="url"
                    className="absolute cursor-text transition-all duration-200 -translate-y-full left-2 pb-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-[1.875rem] peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:pb-0 text-gray-950"
                  >
                    Paste your URL
                  </label>
                </div>
              </form>
              {showTable && <ListUrls />}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
