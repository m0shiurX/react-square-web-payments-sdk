"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const n=require("react"),R=require("../../contexts/form/form.cjs.js"),b=require("../../hooks/use-event-listener.cjs.js"),E=require("./google-pay.styles.cjs.js"),v=({buttonColor:l,buttonSizeMode:u="fill",buttonType:c="long",id:g="rswps-google-pay-container",...p})=>{const[s,P]=n.useState(()=>{}),{cardTokenizeResponseReceived:h,createPaymentRequest:a,payments:i}=R.useForm(),d=n.useRef(null),y=n.useMemo(()=>{const t={buttonColor:l,buttonSizeMode:u,buttonType:c};return Object.keys(t).reduce((e,r)=>(t[r]!==void 0&&(e[r]=t[r]),e),{})},[l,u,c]),q=async t=>{if(t.stopPropagation(),!s){console.warn("Google Pay button was clicked, but no Google Pay instance was found.");return}try{const e=await s.tokenize();if(e.status==="OK")return h(e);let r=`Tokenization failed with status: ${e.status}`;if(e?.errors)throw r+=` and errors: ${JSON.stringify(e?.errors)}`,new Error(r);console.warn(r)}catch(e){console.error(e)}};return n.useEffect(()=>{if(!a)throw new Error("`createPaymentRequest()` is required when using digital wallets");const t=new AbortController,{signal:e}=t;return(async f=>{const w=i?.paymentRequest(a);if(!w)throw new Error("`paymentRequest` is required when using digital wallets");try{const o=await i?.googlePay(w).then(m=>{if(!f?.aborted)return P(m),m});await o?.attach(`#${g}`,y),f.aborted&&await o?.destroy()}catch(o){console.error("Initializing Google Pay failed",o)}})(e),()=>{t.abort()}},[a,i,y]),b.useEventListener({listener:q,type:"click",element:d.current,options:{passive:!0}}),n.createElement("div",{...p,id:g,ref:d},s?null:n.createElement(E.ButtonLoader,null))};exports.default=v;
//# sourceMappingURL=google-pay.cjs.js.map
