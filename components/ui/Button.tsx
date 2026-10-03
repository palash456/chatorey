import React from 'react';
type Variant = 'default' | 'primary' | 'green' | 'ghost';
type Size = 'sm' | 'md' | 'big';
const VARIANT: Record<Variant, string> = {
  default: 'bg-card border border-line text-ink',
  primary: 'bg-brand border border-brand text-white',
  green: 'bg-green border border-green text-white',
  ghost: 'bg-transparent border-0 shadow-none text-ink'
};
const SIZE: Record<Size, string> = {
  sm: 'px-3.5 py-2 text-[13px] rounded-[10px]',
  md: 'px-4 py-3 text-sm rounded-xl',
  big: 'px-4.5 py-4 text-[16px] rounded-2xl'
};
export function Button({
  children, variant = 'default', size = 'md', block, className = '', ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; block?: boolean }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-bold shadow-card active:scale-[.98] disabled:opacity-40 disabled:pointer-events-none motion-reduce:active:scale-100 ${VARIANT[variant]} ${SIZE[size]} ${block ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
