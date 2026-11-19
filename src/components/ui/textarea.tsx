import * as React from 'react';
import {cn} from '@/src/lib/utils';

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({className, ...props}, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[128px] w-full rounded-lg border border-zinc-400/80 dark:border-zinc-800 bg-zinc-100 dark:bg-[#09090B] px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50 resize-y',
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';
