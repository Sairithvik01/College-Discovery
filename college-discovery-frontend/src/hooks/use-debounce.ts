"use client";

import { useState, useEffect } from "react";

/**
 * Debounce a value by a given delay.
 * Returns the debounced value that only updates after `delay` ms of inactivity.
 *
 * Usage:
 *   const debouncedSearch = useDebounce(searchInput, 300);
 *   // debouncedSearch updates 300ms after the user stops typing
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
