"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const l=require("react"),t=require("./error-screen.styles.cjs.js");function c(r){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(r){for(const o in r)if(o!=="default"){const a=Object.getOwnPropertyDescriptor(r,o);Object.defineProperty(n,o,a.get?a:{enumerable:!0,get:()=>r[o]})}}return n.default=r,Object.freeze(n)}const e=c(l);function u({isDevelopment:r=process.env.NODE_ENV==="development"},n){if(process.env.NODE_ENV!=="development")throw new Error("Please contact your developer to provide the required parameters to use the Web Payments SDK.");return e.createElement(t.Container,{ref:n},e.createElement(t.SvgContainer,null,e.createElement(t.Svg,{height:17,viewBox:"0 0 20 17",width:20},e.createElement("path",{d:"M10.874.573l8.3 14.941A1 1 0 0118.3 17H1.7a1 1 0 01-.875-1.486l8.3-14.94a1 1 0 011.75 0zM9 12v2h2v-2H9zm2-1V7H9v4h2z",fill:"#d92b2b",fillRule:"evenodd"}))),e.createElement(t.TextContainer,null,e.createElement(t.Title,null,r?"No location ID or app ID found. Please check your configuration.":"Error"),e.createElement(t.Text,null,r?e.createElement(e.Fragment,null,"Please provide a location ID or app ID to use the"," ",e.createElement("a",{href:"https://developer.squareup.com/docs/web-payments/overview",rel:"noopener noreferrer",target:"_blank"},"Web Payments SDK")," ","to take payments on a web client."):e.createElement(e.Fragment,null,"An error occurred has ocurred while loading your Payment Form."))))}const i=e.forwardRef(u);exports.default=i;
//# sourceMappingURL=error-screen.cjs.js.map
