import { useEffect, useState } from "react";

export default function useDebounce(clicked: boolean, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(clicked);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(clicked), delay);
    return () => clearTimeout(handler);
  }, [clicked, delay]);

  return debouncedValue;
}
