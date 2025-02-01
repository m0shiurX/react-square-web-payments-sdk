import m, { useState as P, useRef as h, useEffect as b } from "react";
import { useForm as R } from "../../contexts/form/form.es.mjs";
import { useEventListener as g } from "../../hooks/use-event-listener.es.mjs";
import { ApplePayContainer as q } from "./apple-pay.styles.es.mjs";
function z({ id: u = "rswps-apple-pay", ...y }) {
  const [t, f] = P(() => {
  }), { cardTokenizeResponseReceived: d, createPaymentRequest: a, payments: o } = R(), i = h(null), w = async (r) => {
    if (r.stopPropagation(), !t) {
      console.warn("Apple Pay button was clicked, but no Apple Pay instance was found.");
      return;
    }
    try {
      const e = await t.tokenize();
      if (e.status === "OK")
        return d(e);
      let n = `Tokenization failed with status: ${e.status}`;
      if (e?.errors)
        throw n += ` and errors: ${JSON.stringify(e?.errors)}`, new Error(n);
      console.warn(n);
    } catch (e) {
      console.error(e);
    }
  };
  return b(() => {
    if (!a)
      throw new Error("`createPaymentRequest()` is required when using digital wallets");
    const r = new AbortController(), { signal: e } = r;
    return (async (l) => {
      const p = o?.paymentRequest(a);
      if (!p)
        throw new Error("`paymentRequest` is required when using digital wallets");
      try {
        const s = await o?.applePay(p).then((c) => {
          if (!l?.aborted)
            return f(c), c;
        });
        l.aborted && await s?.destroy();
      } catch (s) {
        console.error("Initializing Apple Pay failed", s);
      }
    })(e), () => {
      r.abort();
    };
  }, [a, o]), g({
    listener: w,
    type: "click",
    element: i,
    options: {
      passive: !0
    }
  }), /* @__PURE__ */ m.createElement(
    q,
    {
      ...y,
      css: {
        display: t ? "block" : "none",
        opacity: t ? 1 : 0.5,
        pointerEvents: t ? "auto" : "none",
        visibility: t ? "visible" : "hidden"
      },
      id: u,
      ref: i
    }
  );
}
export {
  z as default
};
//# sourceMappingURL=apple-pay.es.mjs.map
