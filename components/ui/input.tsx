import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'flex h-12 w-full rounded-2xl border border-mocha/15 bg-white/70 px-4 py-2 text-sm text-foreground shadow-sm outline-none transition placeholder:text-mocha/45 focus:border-mocha/35 focus:bg-white',
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
