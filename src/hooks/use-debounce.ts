import { useEffect, useState } from 'react';

export default function useDebounce<T>(value: T, delay: number, clearIfEmpty: boolean = true): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (clearIfEmpty && !value) {
      setDebouncedValue(value);
      return;
    }

    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay, clearIfEmpty]);

  return debouncedValue;
}
