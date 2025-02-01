"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const r=require("react"),c=require("./use-isomorphic-layout-effect.cjs.js");function o(e){const t=r.useRef(e);return c.useIsomorphicLayoutEffect(()=>{t.current=e},[e]),r.useCallback((...u)=>t.current(...u),[])}exports.useDynamicCallback=o;
//# sourceMappingURL=use-dynamic-callback.cjs.js.map
