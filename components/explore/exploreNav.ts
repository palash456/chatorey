import type { Dispatch } from 'react';
import type { Action } from '../../context/reducer';

export function switchExploreSeg(dispatch: Dispatch<Action>, v: 'stalls' | 'community' | 'reels') {
  dispatch({ type: 'ESEG', v });
  if (v === 'reels') {
    const mobile = typeof window !== 'undefined' && !window.matchMedia('(min-width: 1024px)').matches;
    if (mobile) dispatch({ type: 'REEL_OPEN', idx: 0 });
    else dispatch({ type: 'REEL_CLOSE' });
  } else {
    dispatch({ type: 'REEL_CLOSE' });
  }
}
