import { useCallback, useEffect, useRef } from 'react';

const useClickOutside = (callback: (e: MouseEvent) => void) => {
  const ref = useRef<HTMLElement>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) callback(e);
    },
    [callback],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, { capture: true });
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return ref;
};

export default useClickOutside;
