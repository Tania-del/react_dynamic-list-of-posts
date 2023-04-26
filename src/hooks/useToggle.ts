import { useCallback, useState } from 'react';

export const useToggle = (initial = false) => {
  const [toggle, setToggle] = useState<boolean>(initial);

  const handleToggle = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  const toggleOn = useCallback(() => {
    setToggle(true);
  }, []);
  const toggleOff = useCallback(() => {
    setToggle(false);
  }, []);

  return {
    handleToggle, toggle, toggleOn, toggleOff,
  };
};
