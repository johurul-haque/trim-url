import { deleteUrl } from '@/components/layouts/table/actions/delete-url';
import { Button, D } from '@/components/ui';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ActionParams } from './actions/params';

export function DeleteRow(props: ActionParams) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <D.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <D.DialogTrigger title="Remove from list">
        <span className="sr-only">Remove from list</span>
        <Trash2
          aria-hidden={true}
          className="w-5 h-5 hover:stroke-gray-600 stroke-gray-500"
        />
      </D.DialogTrigger>

      <D.DialogContent>
        <D.DialogHeader>
          <D.DialogTitle>Are you absolutely sure?</D.DialogTitle>
          <D.DialogDescription className="pt-1">
            This action is permanent and cannot be undone.
          </D.DialogDescription>
        </D.DialogHeader>

        <Button
          type="submit"
          onClick={() => {
            setIsOpen(false);
            deleteUrl(props);
          }}
          className="block lowercase font-mono bg-rose-500 hover:bg-rose-400 max-sm:mx-auto ml-auto focus-visible:ring-rose-300"
          variant={'destructive'}
        >
          Delete
        </Button>
      </D.DialogContent>
    </D.Dialog>
  );
}
