import { toast } from '@/components/ui';
import copyUrl from '@/utils/copy';
import { Copy } from 'lucide-react';

type CopyUrlProps = {
  shortId: string;
  toast: typeof toast;
};

export function CopyUrl({ shortId, toast }: CopyUrlProps) {
  return (
    <button
      title="Copy to Clipboard"
      onClick={() => copyUrl({ path: shortId, toast })}
    >
      <span className="sr-only">Copy to clipboard</span>
      <Copy
        aria-hidden={true}
        className="w-5 h-5 hover:stroke-gray-600 stroke-gray-500"
      />
    </button>
  );
}
