import{r as n,j as e,L as o,w as k,a as y,u,M as b,b as j,S as w,c as E,O as S,i as T}from"./jsx-runtime-F7w9VrsA.js";import{u as g,r as N}from"./locale-DL503dbO.js";import{a as I}from"./asset-C-rVqAQZ.js";const C=`/* The palette. Inlined into every page's <head> before the deferred
   stylesheet loads, which is what stops a light flash on dark systems.
   styles.css only consumes these via var(--*); this file is the one place a
   colour is defined. Resolved themes are calm (default), classic, and dark.

   Accents are sampled from public/icon-384.png: the pink-lavender field
   (#ecb4ec, #eca6ec), the cooler periwinkle corner (#bdc5f7), and a deepened
   magenta for type and buttons. --accent-green is the primary brand accent
   (named before the icon drove the palette).

   Build step: scripts/extract-theme-prelude.mjs inlines this verbatim. It was
   an inline <style> in the Angular site's index.html; extracting it means the
   palette is now a real stylesheet that can be linted and diffed. */
:root,
html[data-theme="calm"] {
  color-scheme: light;
  --bg-color: #f3e6f4;
  --surface: #ffffff;
  --surface-2: #f7f1f8;
  --text-primary: #2a1e2d;
  --text-secondary: #6b5a6e;
  --on-accent: #ffffff;
  --accent-green: #d4a0d0;
  --accent-green-dark: #8e3f8a;
  --accent-rose: #eca6dc;
  --accent-rose-dark: #a34d88;
  --link-accent: #4f5cc4;
  --header-gradient: linear-gradient(135deg, #c989c9 0%, #8aa0f0 100%);
  --rule: rgba(42, 30, 45, 0.12);
  --h2-rule: rgba(142, 63, 138, 0.28);
  --card-border: 1px solid rgba(201, 137, 201, 0.35);
  --card-shadow: 0 2px 24px rgba(42, 30, 45, 0.06);
  --placeholder-edge: rgba(107, 90, 110, 0.45);
  --max-width: 760px;
}
html[data-theme="classic"] {
  color-scheme: light;
  --bg-color: #f6eef6;
  --surface: #ffffff;
  --surface-2: #fbf7fb;
  --text-primary: #2c2430;
  --text-secondary: #5d5362;
  --rule: rgba(44, 36, 48, 0.14);
  --h2-rule: rgba(142, 63, 138, 0.28);
  --card-border: 1px solid rgba(201, 137, 201, 0.22);
  --card-shadow: 0 4px 20px rgba(42, 30, 45, 0.05);
  --placeholder-edge: rgba(93, 83, 98, 0.45);
  --max-width: 800px;
}
html[data-theme="dark"] {
  color-scheme: dark;
  --bg-color: #161218;
  --surface: #221c24;
  --surface-2: #2b232e;
  --text-primary: #f3eaf4;
  --text-secondary: #b9a8bc;
  --on-accent: #1a1218;
  --accent-green: #c989c9;
  --accent-green-dark: #d4a3d4;
  --accent-rose: #e8a8d0;
  --accent-rose-dark: #d489bc;
  --link-accent: #c4b0f0;
  --header-gradient: linear-gradient(135deg, #4a2d4a 0%, #3d3a5a 100%);
  --rule: rgba(243, 234, 244, 0.14);
  --h2-rule: rgba(212, 163, 212, 0.35);
  --card-border: 1px solid rgba(255, 255, 255, 0.08);
  --card-shadow: 0 4px 28px rgba(0, 0, 0, 0.35);
  --placeholder-edge: rgba(185, 168, 188, 0.5);
}
`,H=`// Resolve and apply the saved theme before first paint, so the page never
// flashes the wrong palette. Inlined into every page's <head> verbatim by
// scripts/extract-theme-prelude.mjs, ahead of any React code: it must run
// synchronously and cannot be a module.
//
// app/lib/theme.tsx implements the same resolution rule for the live page.
// These two are still a pair — this one runs before React exists and cannot
// import from it — so a change to the rule belongs in both. What extraction
// did remove is the palette duplication: the tokens have one source now.
(function () {
  var choice = "system";
  try {
    var raw = localStorage.getItem("heartbond-theme");
    if (raw === "system" || raw === "calm" || raw === "classic" || raw === "dark") {
      choice = raw;
    }
  } catch (e) {}
  var resolved = choice === "system"
    ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "calm")
    : choice;
  document.documentElement.setAttribute("data-theme", resolved);
})();
`,f="heartbond-theme",L=["system","calm","classic","dark"],_="(prefers-color-scheme: dark)",R={calm:"#c989c9",classic:"#f6eef6",dark:"#161218"},x=n.createContext({themeChoice:"system",setTheme:()=>{},resolvedTheme:"calm"});function M(a){return L.includes(a)?a:"system"}function A(a){const t=window.matchMedia(_);return t.addEventListener("change",a),()=>t.removeEventListener("change",a)}function B(){return n.useSyncExternalStore(A,()=>window.matchMedia(_).matches,()=>!1)}function P({children:a}){const[t,s]=n.useState("system"),[d,m]=n.useState(!1),i=B();n.useEffect(()=>{try{s(M(localStorage.getItem(f)))}catch{}m(!0)},[]);const r=n.useCallback(p=>{s(p);try{localStorage.setItem(f,p)}catch{}},[]),l=t==="system"?i?"dark":"calm":t;n.useEffect(()=>{d&&(document.documentElement.setAttribute("data-theme",l),document.getElementById("meta-theme-color")?.setAttribute("content",R[l]))},[d,l]);const v=n.useMemo(()=>({themeChoice:t,setTheme:r,resolvedTheme:l}),[t,r,l]);return e.jsx(x.Provider,{value:v,children:a})}function $(){return n.useContext(x)}const O="_nav_sunkp_4",D="_nav__inner_sunkp_13",z="_wordmark_sunkp_21",F="_wordmark__icon_sunkp_32",K="_nav__links_sunkp_40",U="_active_sunkp_57",W="_theme_sunkp_62",c={nav:O,nav__inner:D,wordmark:z,wordmark__icon:F,nav__links:K,active:U,theme:W};function Y(){const a=g(),{copy:t}=a,{themeChoice:s,setTheme:d}=$(),m=r=>r===""?a.page==="":a.page===r||a.page.startsWith(`${r}/`),i=r=>m(r)?{className:c.active,"aria-current":"page"}:{};return e.jsx("header",{className:c.nav,children:e.jsxs("div",{className:`container ${c.nav__inner}`,children:[e.jsxs(o,{className:c.wordmark,to:a.path(""),"aria-label":"HeartBond support home",children:[e.jsx("img",{className:c.wordmark__icon,src:I("app-icon.png"),width:32,height:32,alt:""}),t.nav.wordmark]}),e.jsxs("nav",{className:c.nav__links,"aria-label":"Primary",children:[e.jsx(o,{to:a.path(""),...i(""),children:t.nav.links.home}),e.jsx(o,{to:a.path("getting-started"),...i("getting-started"),children:t.nav.links.gettingStarted}),e.jsx(o,{to:a.path("privacy"),...i("privacy"),children:t.nav.links.privacy}),e.jsx(o,{to:a.path("terms"),...i("terms"),children:t.nav.links.terms})]}),e.jsxs("label",{className:c.theme,children:[e.jsx("span",{className:"visually-hidden",children:t.nav.theme.label}),e.jsxs("select",{value:s,onChange:r=>d(r.target.value),"aria-label":t.nav.theme.label,children:[e.jsx("option",{value:"system",children:t.nav.theme.system}),e.jsx("option",{value:"calm",children:t.nav.theme.calm}),e.jsx("option",{value:"classic",children:t.nav.theme.classic}),e.jsx("option",{value:"dark",children:t.nav.theme.dark})]})]})]})})}const J="_footer_1s2ft_9",Q="_footer__inner_1s2ft_16",V="_footer__links_1s2ft_21",q="_footer__fine_1s2ft_43",h={footer:J,footer__inner:Q,footer__links:V,footer__fine:q};function G(){const a=g(),{copy:t}=a,s=t.app.footer.copyrightHtml.replace("{{year}}",String(new Date().getFullYear())).replace("{{ikiSystemsHome}}",t.links.ikiSystemsHome);return e.jsx("footer",{className:h.footer,children:e.jsxs("div",{className:`container ${h.footer__inner}`,children:[e.jsxs("nav",{className:h.footer__links,"aria-label":"Footer",children:[e.jsx(o,{to:a.path(""),children:t.app.footer.links.home}),e.jsx(o,{to:a.path("getting-started"),children:t.app.footer.links.gettingStarted}),e.jsx(o,{to:a.path("privacy"),children:t.app.footer.links.privacy}),e.jsx(o,{to:a.path("terms"),children:t.app.footer.links.terms}),e.jsx("a",{href:t.links.ikiSystemsHome,target:"_blank",rel:"noopener noreferrer",children:t.app.footer.links.ikiSystems})]}),e.jsx("p",{className:h.footer__fine,dangerouslySetInnerHTML:{__html:s}})]})})}const X="_shell_ypk7l_8",Z={shell:X},re=()=>[{rel:"icon",type:"image/png",sizes:"32x32",href:"/favicon-32.png"},{rel:"icon",type:"image/png",sizes:"48x48",href:"/favicon-48.png"},{rel:"icon",type:"image/x-icon",href:"/favicon.ico"},{rel:"apple-touch-icon",href:"/icon-384.png"}];function ne({children:a}){const{pathname:t}=u(),{locale:s}=N(t);return e.jsxs("html",{lang:s.htmlLang,suppressHydrationWarning:!0,children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx("meta",{name:"theme-color",content:"#c989c9",id:"meta-theme-color"}),e.jsx("style",{id:"theme-tokens",dangerouslySetInnerHTML:{__html:C}}),e.jsx("script",{dangerouslySetInnerHTML:{__html:H}}),e.jsx(b,{}),e.jsx(j,{})]}),e.jsxs("body",{children:[a,e.jsx(w,{}),e.jsx(E,{})]})]})}const oe=k(function(){return ee(),e.jsx(P,{children:e.jsxs("app-root",{className:Z.shell,children:[e.jsx(Y,{}),e.jsx("main",{children:e.jsx(S,{})}),e.jsx(G,{})]})})});function ee(){const{hash:a,key:t}=u();n.useEffect(()=>{if(!a)return;const s=document.getElementById(decodeURIComponent(a.slice(1)));s&&s.scrollIntoView()},[a,t])}const ce=y(function({error:t}){const s=T(t)?`${t.status} ${t.statusText}`:t instanceof Error?t.message:"Unknown error";return e.jsxs("div",{className:"container",style:{padding:"4rem 0"},children:[e.jsx("h1",{children:"Something went wrong"}),e.jsx("p",{children:s}),e.jsx("p",{children:e.jsx("a",{href:"/",children:"Back to the support page"})})]})});export{ce as ErrorBoundary,ne as Layout,oe as default,re as links};
