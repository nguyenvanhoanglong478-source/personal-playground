import { useEffect } from 'react';

let activeLockCount = 0;
let savedOverflow = '';

export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked || typeof document === 'undefined') return;

    if (activeLockCount === 0) {
      const current = document.body.style.overflow;
      savedOverflow = current === 'hidden' ? '' : current;
      document.body.style.overflow = 'hidden';
    }
    activeLockCount += 1;

    return () => {
      activeLockCount = Math.max(0, activeLockCount - 1);
      if (activeLockCount === 0) {
        document.body.style.overflow = savedOverflow;
      }
    };
  }, [locked]);
}
