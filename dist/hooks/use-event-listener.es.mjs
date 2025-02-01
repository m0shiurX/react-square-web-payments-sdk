import t from "react";
const f = (e) => e && typeof e == "object" && "current" in e ? e.current : e, d = !(typeof window < "u" && window.document?.createElement);
function a({ type: e, listener: u, element: c = d ? void 0 : window, options: s }) {
  const o = t.useRef(null);
  t.useEffect(() => {
    o.current = u;
  }, [u]);
  const r = t.useCallback((n) => {
    o.current?.(n);
  }, []);
  t.useEffect(() => {
    const n = f(c);
    return n?.addEventListener(e, r, s), () => n?.removeEventListener(e, r);
  }, [e, c, s, r]);
}
export {
  f as getRefElement,
  a as useEventListener
};
//# sourceMappingURL=use-event-listener.es.mjs.map
