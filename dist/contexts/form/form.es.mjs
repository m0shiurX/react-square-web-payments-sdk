import c, { useContext as w, createContext as b, useState as i, useEffect as P } from "react";
import { payments as z } from "../../node_modules/@square/web-sdk/dist/index.es.mjs";
import C from "../../components/error-screen/error-screen.es.mjs";
import { useDynamicCallback as E } from "../../hooks/use-dynamic-callback.es.mjs";
const u = b({
  cardTokenizeResponseReceived: null,
  createPaymentRequest: null,
  payments: null
});
function q({ applicationId: e, locationId: r, children: l, overrides: m, ...n }) {
  const [o, f] = i(), [d] = i(
    () => n.createPaymentRequest?.()
  );
  P(() => {
    const t = new AbortController(), { signal: a } = t;
    async function v(k) {
      await z(e, r, m).then((s) => {
        if (s === null)
          throw new Error("Square Web Payments SDK failed to load");
        if (!k?.aborted)
          return f(s), s;
      });
    }
    return e && r && v(a), () => {
      t.abort();
    };
  }, [e, r]);
  const R = E(async (t) => {
    if (t.errors || !n.createVerificationDetails) {
      await n.cardTokenizeResponseReceived(t);
      return;
    }
    const a = await o?.verifyBuyer(String(t.token), n.createVerificationDetails());
    await n.cardTokenizeResponseReceived(t, a);
  });
  if (!e || !r)
    return /* @__PURE__ */ c.createElement(C, null);
  if (!o) return null;
  const y = {
    cardTokenizeResponseReceived: R,
    createPaymentRequest: d,
    payments: o
  };
  return /* @__PURE__ */ c.createElement(u.Provider, { value: y }, l);
}
const D = () => {
  const e = w(u);
  if (e === void 0)
    throw new Error("useForm must be used within a FormProvider");
  return e;
};
export {
  u as FormContext,
  q as default,
  D as useForm
};
//# sourceMappingURL=form.es.mjs.map
