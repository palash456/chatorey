import React from 'react';
export function Card({ children, className = '', ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`bg-card rounded-2xl shadow-card ${className}`} {...rest}>{children}</div>;
}
