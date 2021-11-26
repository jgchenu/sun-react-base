import { useEffect } from 'react';

export function useDisableBodyScroll(disabled: boolean) {
  useEffect(() => {
    if (disabled) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [disabled]);
}
