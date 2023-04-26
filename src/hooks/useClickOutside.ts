import { useEffect, useRef } from 'react';

type Callback = (event: MouseEvent) => void;

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: Callback,
) => {
  const callbackRef = useRef<Callback>();

  callbackRef.current = callback;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callbackRef.current?.(event);
      }
    }

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ref]);
};
