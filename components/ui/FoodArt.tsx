import React from 'react';
import type { Stall } from '../../lib/types';
import { hs } from '../../lib/helpers';

const ART_SHAPE: Record<string, string> = {
  kachori: 'round', samosa: 'round', 'mirchi bada': 'round', snacks: 'round', momos: 'dumpling',
  chai: 'drink', lassi: 'drink', coffee: 'drink', 'kesar doodh': 'drink', milk: 'drink',
  chaat: 'bowl', 'dal baati': 'bowl', golgappe: 'bowl', 'kanji vada': 'bowl', maggi: 'bowl',
  jalebi: 'swirl', ghewar: 'swirl', sweets: 'swirl',
  kulfi: 'scoop', rolls: 'wrap', 'chole kulche': 'wrap', sandwich: 'stack', 'pav bhaji': 'stack'
};
function shapeFor(s: Stall) {
  for (const f of s.foods) if (ART_SHAPE[f]) return ART_SHAPE[f];
  return 'round';
}

export function FoodArt({ stall }: { stall: Stall }) {
  const shape = shapeFor(stall);
  const [c1, c2] = stall.c;
  const id = 'g' + hs(stall);

  let inner: React.ReactNode = null;
  if (shape === 'round') {
    inner = (
      <>
        <ellipse cx="100" cy="128" rx="64" ry="14" fill="#000" opacity=".14" />
        <circle cx="96" cy="96" r="42" fill={`url(#${id})`} />
        <circle cx="130" cy="104" r="34" fill={`url(#${id})`} opacity=".92" />
        <path d="M74 78 Q96 60 118 78" fill="none" stroke="#ffffff9a" strokeWidth={4} strokeLinecap="round" />
        <path d="M64 100q4 18 24 22" fill="none" stroke="#00000022" strokeWidth={3} strokeLinecap="round" />
        <circle cx="82" cy="86" r="7" fill="#fff" opacity=".28" />
        {[[70, 110], [104, 118], [122, 88], [88, 68]].map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={3} fill="#fff" opacity={.55} />
        ))}
        <ellipse cx="100" cy="120" rx="30" ry="6" fill={c1} opacity=".25" />
      </>
    );
  } else if (shape === 'dumpling') {
    inner = (
      <>
        <ellipse cx="100" cy="130" rx="62" ry="13" fill="#000" opacity=".12" />
        <path d="M60 108 Q60 72 100 72 Q140 72 140 108 Q140 120 100 120 Q60 120 60 108Z" fill={`url(#${id})`} />
        {[0, 1, 2, 3, 4, 5].map(i => (
          <line key={i} x1={100} y1={72} x2={100 + (i - 2.5) * 13} y2={90} stroke="#ffffff77" strokeWidth={2} />
        ))}
        <circle cx="100" cy="76" r="5" fill="#fff" opacity=".8" />
      </>
    );
  } else if (shape === 'drink') {
    const hot = stall.foods.includes('chai') || stall.foods.includes('kesar doodh');
    inner = (
      <>
        <ellipse cx="100" cy="132" rx="40" ry="10" fill="#000" opacity=".1" />
        <path d="M72 60 L128 60 L120 128 Q100 138 80 128 Z" fill={`url(#${id})`} />
        <path d="M72 60 L128 60 L124 78 Q100 86 76 78 Z" fill="#fff" opacity=".35" />
        <rect x="72" y="58" width="56" height="7" rx="3" fill="#00000022" />
        {hot && <path d="M118 66 q16 6 8 22 q-6 12 -18 10" fill="none" stroke="#fff" strokeWidth={4} opacity={.55} />}
      </>
    );
  } else if (shape === 'bowl') {
    inner = (
      <>
        <ellipse cx="100" cy="130" rx="66" ry="12" fill="#000" opacity=".14" />
        <path d="M40 92 Q40 134 100 134 Q160 134 160 92 Z" fill={`url(#${id})`} />
        <path d="M40 92 Q100 112 160 92" fill="none" stroke="#00000018" strokeWidth={2} />
        <ellipse cx="100" cy="90" rx="58" ry="17" fill="#FFF7E6" />
        <ellipse cx="100" cy="90" rx="58" ry="17" fill="none" stroke="#00000015" strokeWidth={2} />
        {[[-26, -2, '#8B3A0E'], [8, 5, '#C1440E'], [28, -5, '#2E7D32'], [-6, 7, '#C1440E'], [-40, 3, '#2E7D32'], [42, 3, '#8B3A0E']].map((p, i) => (
          <circle key={i} cx={100 + (p[0] as number)} cy={90 + (p[1] as number)} r={5.5} fill={p[2] as string} opacity={.85} />
        ))}
        <path d="M64 84q36 14 72 0" fill="none" stroke="#F4B400" strokeWidth={3} opacity={.7} />
      </>
    );
  } else if (shape === 'swirl') {
    inner = (
      <>
        <ellipse cx="100" cy="132" rx="58" ry="11" fill="#000" opacity=".14" />
        <circle cx="100" cy="98" r="40" fill="none" stroke={`url(#${id})`} strokeWidth={11} strokeLinecap="round" />
        <path d="M100 62a36 36 0 0 1 25 61" fill="none" stroke="#ffffff70" strokeWidth={5} strokeLinecap="round" />
        <circle cx="100" cy="98" r="26" fill="none" stroke={`url(#${id})`} strokeWidth={8} strokeLinecap="round" />
        <circle cx="100" cy="98" r="12" fill={`url(#${id})`} />
        {[0, 72, 144, 216, 288].map((a, i) => (
          <circle key={i} cx={100 + 48 * Math.cos(a * Math.PI / 180)} cy={98 + 48 * Math.sin(a * Math.PI / 180)} r={2.6} fill="#fff" opacity={.7} />
        ))}
      </>
    );
  } else if (shape === 'scoop') {
    inner = (
      <>
        <ellipse cx="100" cy="132" rx="30" ry="8" fill="#000" opacity=".12" />
        <path d="M84 130 L78 78 Q100 62 122 78 L116 130Z" fill={`url(#${id})`} />
        <ellipse cx="100" cy="78" rx="22" ry="14" fill={`url(#${id})`} />
        <ellipse cx="100" cy="74" rx="22" ry="12" fill="#fff" opacity=".3" />
      </>
    );
  } else if (shape === 'wrap') {
    inner = (
      <>
        <ellipse cx="100" cy="126" rx="58" ry="11" fill="#000" opacity=".12" />
        <path d="M52 108 Q52 76 100 70 Q148 76 148 108 Q148 122 100 122 Q52 122 52 108Z" fill={`url(#${id})`} />
        <path d="M60 100 Q100 118 140 100" fill="none" stroke="#fff" strokeWidth={3} opacity={.5} />
      </>
    );
  } else {
    inner = (
      <>
        <ellipse cx="100" cy="130" rx="56" ry="11" fill="#000" opacity=".12" />
        <rect x="56" y="100" width="88" height="20" rx="6" fill={`url(#${id})`} />
        <rect x="60" y="82" width="80" height="20" rx="6" fill={`url(#${id})`} opacity=".92" />
        <rect x="64" y="66" width="72" height="18" rx="8" fill={`url(#${id})`} opacity=".85" />
      </>
    );
  }

  return (
    <svg viewBox="0 0 200 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label={`${stall.name} illustration`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </linearGradient>
        <radialGradient id={`p${id}`} cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="#fff" stopOpacity=".9" />
          <stop offset="1" stopColor="#fff" stopOpacity=".55" />
        </radialGradient>
      </defs>
      <rect width="200" height="160" fill={`url(#p${id})`} />
      {inner}
    </svg>
  );
}
