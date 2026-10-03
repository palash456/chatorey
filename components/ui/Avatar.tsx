import React from 'react';
import { USERS } from '../../lib/data';
export function Avatar({ uid, size = 32, decorative = false }: { uid: string; size?: number; decorative?: boolean }) {
  const u = USERS[uid] || { n: uid, c: '#999' };
  const style = { width: size, height: size, flex: `0 0 ${size}px` } as React.CSSProperties;
  if ('photo' in u && u.photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={u.photo} alt={decorative ? '' : u.n} style={style} className="rounded-full object-cover" />;
  }
  return (
    <span
      style={{ ...style, background: u.c + '22', color: u.c }}
      className="rounded-full grid place-items-center font-extrabold text-[13px]"
    >
      {u.n[0]}
    </span>
  );
}
