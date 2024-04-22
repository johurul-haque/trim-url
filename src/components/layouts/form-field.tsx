import { saveToLocalStorage } from '@/lib/save-to-local-storage';
import { SetStateActionType } from '@/types/set-state-action';
import { TableData } from '@/types/table-data';
import axios from 'axios';
import { ScissorsLineDashed } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from '../ui/use-toast';

type Inputs = {
  url: string;
};

type FormFieldProps = {
  setTableData: SetStateActionType<TableData[]>;
};

export function FormField({ setTableData }: FormFieldProps) {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ url }) => {
    try {
      const { update: updateToast, id } = toast({
        description: 'Generating your short link',
      });

      const { data: response } = await axios.post('/api', { url });

      updateToast({ description: 'Generated short link', id });

      saveToLocalStorage({ data: response.data, setTableData });
    } catch (error) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        variant: 'destructive',
      });
    }
  };

  return (
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

        <button
          className="min-[200px]:shrink-0 max-sm:mx-auto max-sm:mt-3 max-sm:py-3 shadow-xl sm:shadow-2xl font-mono lowercase px-6 bg-gray-900 text-slate-50 rounded-xl border-2 border-transparent hover:bg-gray-700 transition-all ring-gray-600 focus:ring-[3px] outline-none ring-offset-2 flex gap-2 items-center"
          title="Trim URL"
        >
          <ScissorsLineDashed
            className="md:h-6 md:w-6 max-sm:h-4 max-sm:w-4"
            strokeWidth={1.7}
            aria-hidden={true}
          />
          <span className="sr-only">Trim URL</span>
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
}
