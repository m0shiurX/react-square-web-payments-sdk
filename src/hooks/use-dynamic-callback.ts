// Dependencies
import { useRef, useCallback } from 'react';

// Internals
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

export function useDynamicCallback<T>(callback: T): T;
export function useDynamicCallback(callback: (...args: Record<string, unknown>[]) => void) {
  const ref = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useCallback((...args: Record<string, unknown>[]) => ref.current(...args), []);
}
