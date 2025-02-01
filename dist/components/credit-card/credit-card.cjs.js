"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const z=require("react"),_=require("../../contexts/form/form.cjs.js"),q=require("../../hooks/use-event-listener.cjs.js"),v=require("./credit-card.styles.cjs.js");function L(a){const i=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(a){for(const c in a)if(c!=="default"){const o=Object.getOwnPropertyDescriptor(a,c);Object.defineProperty(i,c,o.get?o:{enumerable:!0,get:()=>a[c]})}}return i.default=a,Object.freeze(i)}const r=L(z);function M({buttonProps:a,callbacks:i,children:c,focus:o,id:l="rswps-card-container",includeInputLabels:f,postalCode:b,recalculateSize:m,render:y,style:w,...S}){const[s,h]=r.useState(()=>{}),[R,g]=r.useState(!1),p=r.useRef(null),{cardTokenizeResponseReceived:j,payments:E}=_.useForm(),k=r.useMemo(()=>{const t={includeInputLabels:f,postalCode:b,style:w};return Object.keys(t).reduce((e,n)=>(t[n]!==void 0&&(e[n]=t[n]),e),{})},[f,b,w]),P=async t=>{if(t.stopPropagation(),!a?.isLoading){if(!s){console.warn("Credit Card button was clicked, but no Credit Card instance was found.");return}g(!0);try{const e=await s.tokenize();if(e.status==="OK")return await j(e);let n=`Tokenization failed with status: ${e.status}`;if(e?.errors)throw n+=` and errors: ${JSON.stringify(e?.errors)}`,new Error(n);console.warn(n)}catch(e){console.error(e)}finally{g(!1)}}};if(r.useEffect(()=>{const t=new AbortController,{signal:e}=t;return(async d=>{const u=await E?.card(k).then(C=>d.aborted?null:(h(C),C));await u?.attach(`#${l}`),o&&await u?.focus(o),d.aborted&&await u?.destroy()})(e),()=>{t.abort()}},[E,l]),r.useEffect(()=>{s&&o&&s.focus(o)},[s,o]),i)for(const t of Object.keys(i))s?.addEventListener(t,i[t]);m&&m(s?.recalculateSize),q.useEventListener({listener:P,type:"click",element:p,options:{passive:!0}});const O=({children:t,isLoading:e,...n})=>{const d="rswp-card-button",u=e||!s||R;return r.createElement(v.PayButton,{...n,"aria-disabled":u,css:n?.css,disabled:u,id:d,ref:p,type:"button"},t??"Pay")};return r.createElement(r.Fragment,null,r.createElement("div",{...S,"data-testid":"rswps-card-container",id:l,style:{minHeight:89}},!s&&r.createElement(v.LoadingCard,null)),typeof y=="function"?y(O):r.createElement(O,{...a},c??"Pay"))}exports.default=M;
//# sourceMappingURL=credit-card.cjs.js.map
