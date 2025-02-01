"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const r=require("react"),R=require("../../contexts/form/form.cjs.js");function C({callbacks:o,id:u="rswps-cash-app-pay",redirectURL:c,referenceId:p,shape:l="round",size:d="medium",values:f="dark",width:m="static",...q}){const[b,g]=r.useState(),{createPaymentRequest:a,payments:i}=R.useForm(),y=r.useMemo(()=>({redirectURL:c||window.location.href,referenceId:p}),[c,p]),w=r.useMemo(()=>{const e={shape:l,size:d,values:f,width:m};return Object.keys(e).reduce((n,t)=>(e[t]!==void 0&&(n[t]=e[t]),n),{})},[l,d,f,m]);if(r.useEffect(()=>{if(!a)throw new Error("`createPaymentRequest()` is required when using digital wallets");const e=new AbortController,{signal:n}=e;let t;return(async A=>{const h=i?.paymentRequest(a);if(!h)throw new Error("`paymentRequest` is required when using digital wallets");try{t=await i?.cashAppPay(h,y).then(s=>{if(!A?.aborted)return g(s),s}),await t?.attach(`#${u}`,w)}catch(s){console.error("Initializing Cash App Pay failed",s)}})(n),()=>{e.abort(),t?.destroy()}},[a,w,y,i]),o)for(const e of Object.keys(o))b?.addEventListener(e.toLowerCase(),o[e]);return r.createElement("div",{...q,id:u})}exports.default=C;
//# sourceMappingURL=cash-app-pay.cjs.js.map
