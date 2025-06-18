"use client";

import { useState, useEffect } from "react";

/**
 * A custom hook that debounces a value by a specified delay.
 *
 * @template T
 * @param {T} value - The value to be debounced.
 * @param {number} delay - The number of milliseconds to wait before updating the debounced value.
 * @returns {T} - The debounced value.
 *
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Perform search with debounced value
 *   }
 * }, [debouncedSearchTerm]);
 */
const useDebounce = <T,>(value: T, delay: number): T => {
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
};

export default useDebounce;