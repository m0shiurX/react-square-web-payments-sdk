import y, { useState as q, useRef as E, useMemo as b, useEffect as G } from "react";
import { useForm as k } from "../../contexts/form/form.es.mjs";
import { useEventListener as v } from "../../hooks/use-event-listener.es.mjs";
import { ButtonLoader as O } from "./google-pay.styles.es.mjs";
const j = ({
  buttonColor: i,
  buttonSizeMode: l = "fill",
  buttonType: c = "long",
  id: u = "rswps-google-pay-container",
  ...p
}) => {
  const [n, P] = q(() => {
  }), { cardTokenizeResponseReceived: h, createPaymentRequest: a, payments: s } = k(), f = E(null), d = b(() => {
    const t = {
      buttonColor: i,
      buttonSizeMode: l,
      buttonType: c
    };
    return Object.keys(t).reduce((e, r) => (t[r] !== void 0 && (e[r] = t[r]), e), {});
  }, [i, l, c]), R = async (t) => {
    if (t.stopPropagation(), !n) {
      console.warn("Google Pay button was clicked, but no Google Pay instance was found.");
      return;
    }
    try {
      const e = await n.tokenize();
      if (e.status === "OK")
        return h(e);
      let r = `Tokenization failed with status: ${e.status}`;
      if (e?.errors)
        throw r += ` and errors: ${JSON.stringify(e?.errors)}`, new Error(r);
      console.warn(r);
    } catch (e) {
      console.error(e);
    }
  };
  return G(() => {
    if (!a)
      throw new Error("`createPaymentRequest()` is required when using digital wallets");
    const t = new AbortController(), { signal: e } = t;
    return (async (g) => {
      const m = s?.paymentRequest(a);
      if (!m)
        throw new Error("`paymentRequest` is required when using digital wallets");
      try {
        const o = await s?.googlePay(m).then((w) => {
          if (!g?.aborted)
            return P(w), w;
        });
        await o?.attach(`#${u}`, d), g.aborted && await o?.destroy();
      } catch (o) {
        console.error("Initializing Google Pay failed", o);
      }
    })(e), () => {
      t.abort();
    };
  }, [a, s, d]), v({
    listener: R,
    type: "click",
    element: f.current,
    options: {
      passive: !0
    }
  }), /* @__PURE__ */ y.createElement("div", { ...p, id: u, ref: f }, n ? null : /* @__PURE__ */ y.createElement(O, null));
};
export {
  j as default
};
//# sourceMappingURL=google-pay.es.mjs.map
