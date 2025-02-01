import { useRef as t, useCallback as u } from "react";
import { useIsomorphicLayoutEffect as f } from "./use-isomorphic-layout-effect.es.mjs";
function s(r) {
  const e = t(r);
  return f(() => {
    e.current = r;
  }, [r]), u((...o) => e.current(...o), []);
}
export {
  s as useDynamicCallback
};
//# sourceMappingURL=use-dynamic-callback.es.mjs.map
