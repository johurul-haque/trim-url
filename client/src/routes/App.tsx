import { Scissors } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import pattern from '../assets/images/pattern.svg';
import { Gradients } from '../components/Gradients';
import { Header } from '../components/Header';
import { ListUrls } from '../layouts/ListUrls';

interface Response {
  status: number;
  id: string;
  redirectUrl: string;
  timeStamp: string;
}

function App() {
  const [tableData, setTableData] = useState([]);

  // using count to rerender after removing data from local storage. 0 and -1 can sometimes be used to indicate the length of the array which leads to not rerendering the component. So 0.5🤭
  const [count, setCount] = useState(0.5);

  useEffect(() => {
    const urlList = JSON.parse(localStorage.getItem('urls')!) as [];
    setTableData(urlList || []);
  }, [count]);

  const removeItem = (id: string) => {
    const index = tableData.findIndex(
      ({ shortId }: { shortId: string }) => shortId === id
    );

    if (index > -1) {
      tableData.splice(index, 1);
      localStorage.removeItem('urls');
      localStorage.setItem('urls', JSON.stringify(tableData));
      setCount(tableData.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.loading('Generating your short link');

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
        urlList.unshift({
          shortId: data.id,
          redirectUrl: data.redirectUrl,
          timeStamp: data.timeStamp,
        });

        localStorage.setItem('urls', JSON.stringify(urlList));
      } else {
        urlList = JSON.parse(localStorage.getItem('urls')!) as any[];

        urlList.unshift({
          shortId: data.id,
          redirectUrl: data.redirectUrl,
          timeStamp: data.timeStamp,
        });

        localStorage.setItem('urls', JSON.stringify(urlList));
      }
      toast.dismiss();
      setCount(urlList.length);
      setTableData(JSON.parse(localStorage.getItem('urls')!) as []);
    }
  };

  return (
    <>
      <Header />
      <Toaster />
      <main className="text-gray-950 flex-1 flex flex-col ring">
        <section className="flex-1 overflow-y-hidden flex flex-col relative w-full overflow-x-clip bg-slate-50 bg-gradient-to-t from-slate-50 to-slate-100 pt-20">
          <Gradients />
          <div className="sm:container max-w-6xl flex-1 flex flex-col">
            <div
              className={`p-4 relative flex-1 z-50 bg-opacity-60 sm:px-14 rounded-t-lg shadow-[2px_8px_30px_-8px_rgba(0,0,0,0.25)] pt-16 sm:pt-32`}
              style={{
                backgroundImage: `url(${pattern})`,
              }}
            >
              <h1 className="lg:text-7xl sm:tracking-tight text-4xl sm:text-5xl mx-auto text-center uppercase font-bold mb-14 sm:mb-20">
                Make your URL'S look{' '}
                <span className="bg-clip-text bg-gradient-to-br from-gray-950 to-gray-500 from-35% text-transparent">
                  Magnificent
                </span>
              </h1>

              <form
                className="lg:max-w-2xl md:max-w-xl mx-auto"
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
                  <button className="shrink-0 max-sm:mx-auto max-sm:mt-3 max-sm:py-3 shadow-xl sm:shadow-2xl font-mono lowercase px-6 bg-gray-900 text-slate-50 rounded-xl border-2 border-transparent hover:bg-gray-700 transition-all ring-gray-600 focus:ring-[3px] outline-none ring-offset-2 flex gap-2 items-center">
                    <Scissors
                      className="md:h-6 md:w-6 max-sm:h-4 max-sm:w-4"
                      strokeWidth={1.7}
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
              {tableData.length > 0 && (
                <ListUrls removeItem={removeItem} data={tableData} />
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
