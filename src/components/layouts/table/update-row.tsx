import PencilIcon from '@/assets/icons/pencil';
import { Button, D, Input } from '@/components/ui';
import { DialogClose } from '@radix-ui/react-dialog';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ActionParams } from './actions/params';
import updateUrl from './actions/update-url';

type Inputs = {
  newUrl: string;
};

export function UpdateRow(props: ActionParams) {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ newUrl }) => {
    updateUrl({ ...props, newUrl });
  };

  return (
    <D.Dialog>
      <D.DialogTrigger
        title="Edit Link"
        className="absolute border py-1 px-3 bg-opacity-95 rounded bg-slate-100 lg:scale-0 lg:group-hover:scale-100 focus-visible:scale-100 transition-transform right-0 top-1/2 -translate-y-1/2"
      >
        <span className="sr-only">Edit Link</span>
        <PencilIcon className="w-5 h-5 hover:stroke-gray-600 stroke-gray-500" />
      </D.DialogTrigger>

      <D.DialogContent>
        <D.DialogHeader>
          <D.DialogTitle>Update URL</D.DialogTitle>
          <D.DialogDescription>
            Add new url and click save to update.
          </D.DialogDescription>
        </D.DialogHeader>

        <D.DialogFooter>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="url"
              {...register('newUrl')}
              placeholder="Enter new URL"
              className="peer"
              required
            />

            <DialogClose asChild>
              <Button
                className="font-mono peer-invalid:pointer-events-none peer-invalid:opacity-70 lowercase mt-3 max-sm:mx-auto ml-auto block focus-visible:ring-gray-500"
                type="submit"
              >
                Save
              </Button>
            </DialogClose>
          </form>
        </D.DialogFooter>
      </D.DialogContent>
    </D.Dialog>
  );
}
