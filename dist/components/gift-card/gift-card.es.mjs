import o, { useState as y, useRef as O, useMemo as P, useEffect as S } from "react";
import { useForm as $ } from "../../contexts/form/form.es.mjs";
import { useEventListener as j } from "../../hooks/use-event-listener.es.mjs";
import { LoadingCard as B, PayButton as F } from "./gift-card.styles.es.mjs";
function A({
  buttonProps: C = {
    id: "rswps-gift-card-button"
  },
  callbacks: s,
  children: h,
  focus: f,
  id: i = "rswps-gift-card-container",
  includeInputLabels: u,
  render: d,
  style: l,
  ...E
}) {
  const [a, R] = y(() => {
  }), [k, m] = y(!1), { cardTokenizeResponseReceived: G, payments: w } = $(), b = O(null), v = P(() => {
    const e = {
      includeInputLabels: u,
      style: l
    };
    return Object.keys(e).reduce((t, r) => (e[r] !== void 0 && (t[r] = e[r]), t), {});
  }, [u, l]), z = async (e) => {
    if (e.stopPropagation(), !a) {
      console.warn("Gift Card button was clicked, but no Gift Card instance was found.");
      return;
    }
    m(!0);
    try {
      const t = await a?.tokenize();
      if (t.status === "OK")
        return await G(t);
      let r = `Tokenization failed with status: ${t.status}`;
      if (t?.errors)
        throw r += ` and errors: ${JSON.stringify(t?.errors)}`, new Error(r);
      console.warn(r);
    } catch (t) {
      console.error(t);
    } finally {
      m(!1);
    }
  };
  if (S(() => {
    const e = new AbortController(), { signal: t } = e;
    return (async (n) => {
      const c = await w?.giftCard(v).then((p) => n.aborted ? null : (R(p), p));
      await c?.attach(`#${i}`), f && await c?.focus(f), n.aborted && await c?.destroy();
    })(t), () => {
      e.abort();
    };
  }, [w, i]), s)
    for (const e of Object.keys(s))
      a?.addEventListener(
        e,
        s[e]
      );
  j({
    listener: z,
    type: "click",
    element: b.current,
    options: {
      passive: !0
    }
  });
  const g = ({ isLoading: e, ...t }) => {
    const r = "rswp-gift-card-button", n = e || !a || k;
    return /* @__PURE__ */ o.createElement(
      F,
      {
        ...t,
        "aria-disabled": n,
        css: t?.css,
        disabled: n,
        id: r,
        ref: b,
        type: "button"
      },
      t?.children ?? "Pay with Gift Card"
    );
  };
  return /* @__PURE__ */ o.createElement(o.Fragment, null, /* @__PURE__ */ o.createElement("div", { ...E, "data-testid": "rswps-gift-card-container", id: i, style: { minHeight: 89 } }, !a && /* @__PURE__ */ o.createElement(B, null)), typeof d == "function" ? d(g) : /* @__PURE__ */ o.createElement(g, { ...C }, h ?? "Pay with Gift Card"));
}
export {
  A as default
};
//# sourceMappingURL=gift-card.es.mjs.map
