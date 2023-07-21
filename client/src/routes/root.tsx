import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import pattern from '../assets/images/pattern.svg';
import { Gradients } from '../components/Gradients';
import { Header } from '../components/Header';

export const Root = () => {
  return (
    <>
      <Header />
      <Toaster />
      <main className="text-gray-950 flex-1 flex flex-col ring">
        <section className="flex-1 overflow-y-hidden flex flex-col relative w-full overflow-x-clip bg-slate-50 bg-gradient-to-t from-slate-50 to-slate-100 sm:pt-20">
          <Gradients />
          <div className="sm:container max-w-6xl flex-1 flex flex-col">
            <div
              className={`p-4 relative flex-1 z-50 bg-opacity-60 sm:px-14 rounded-t-lg shadow-[2px_8px_30px_-8px_rgba(0,0,0,0.25)]`}
              style={{
                backgroundImage: `url(${pattern})`,
              }}
            >
              <Outlet />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
