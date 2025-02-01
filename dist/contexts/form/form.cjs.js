"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const n=require("react"),k=require("../../node_modules/@square/web-sdk/dist/index.cjs.js"),w=require("../../components/error-screen/error-screen.cjs.js"),C=require("../../hooks/use-dynamic-callback.cjs.js"),u=n.createContext({cardTokenizeResponseReceived:null,createPaymentRequest:null,payments:null});function P({applicationId:e,locationId:o,children:i,overrides:l,...r}){const[a,d]=n.useState(),[m]=n.useState(()=>r.createPaymentRequest?.());n.useEffect(()=>{const t=new AbortController,{signal:s}=t;async function v(b){await k.payments(e,o,l).then(c=>{if(c===null)throw new Error("Square Web Payments SDK failed to load");if(!b?.aborted)return d(c),c})}return e&&o&&v(s),()=>{t.abort()}},[e,o]);const f=async t=>{if(t.errors||!r.createVerificationDetails){await r.cardTokenizeResponseReceived(t);return}const s=await a?.verifyBuyer(String(t.token),r.createVerificationDetails());await r.cardTokenizeResponseReceived(t,s)},y=C.useDynamicCallback(f);if(!e||!o)return n.createElement(w.default,null);if(!a)return null;const R={cardTokenizeResponseReceived:y,createPaymentRequest:m,payments:a};return n.createElement(u.Provider,{value:R},i)}const q=()=>{const e=n.useContext(u);if(e===void 0)throw new Error("useForm must be used within a FormProvider");return e};exports.FormContext=u;exports.default=P;exports.useForm=q;
//# sourceMappingURL=form.cjs.js.map
