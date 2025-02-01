import g, { useState as C, useMemo as h, useEffect as E } from "react";
import { useForm as P } from "../../contexts/form/form.es.mjs";
function _({
  callbacks: a,
  id: i = "rswps-cash-app-pay",
  redirectURL: p,
  referenceId: u,
  shape: c = "round",
  size: d = "medium",
  values: f = "dark",
  width: l = "static",
  ...q
}) {
  const [A, R] = C(), { createPaymentRequest: o, payments: s } = P(), m = h(
    () => ({
      redirectURL: p || window.location.href,
      referenceId: u
    }),
    [p, u]
  ), w = h(() => {
    const t = {
      shape: c,
      size: d,
      values: f,
      width: l
    };
    return Object.keys(t).reduce((r, e) => (t[e] !== void 0 && (r[e] = t[e]), r), {});
  }, [c, d, f, l]);
  if (E(() => {
    if (!o)
      throw new Error("`createPaymentRequest()` is required when using digital wallets");
    const t = new AbortController(), { signal: r } = t;
    let e;
    return (async (b) => {
      const y = s?.paymentRequest(o);
      if (!y)
        throw new Error("`paymentRequest` is required when using digital wallets");
      try {
        e = await s?.cashAppPay(y, m).then((n) => {
          if (!b?.aborted)
            return R(n), n;
        }), await e?.attach(`#${i}`, w);
      } catch (n) {
        console.error("Initializing Cash App Pay failed", n);
      }
    })(r), () => {
      t.abort(), e?.destroy();
    };
  }, [o, w, m, s]), a)
    for (const t of Object.keys(a))
      A?.addEventListener(
        t.toLowerCase(),
        a[t]
      );
  return /* @__PURE__ */ g.createElement("div", { ...q, id: i });
}
export {
  _ as default
};
//# sourceMappingURL=cash-app-pay.es.mjs.map
