import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Fogo & Co — Brazilian Fire. Premium Events.",
  description:
    "A premium Brazilian BBQ catering experience crafted for weddings, corporate events and private celebrations across Australia.",
  openGraph: {
    title: "Fogo & Co — Brazilian Fire. Premium Events.",
    description:
      "Premium Brazilian BBQ catering for weddings, corporate and private events.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Auto-heal when stale CSS hash breaks styles in proxy previews */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function reload(){var now=Date.now();var t=parseInt(sessionStorage.getItem('_cssFix')||'0');if(now-t<=3500)return;sessionStorage.setItem('_cssFix',String(now));try{var u=new URL(location.href);u.searchParams.set('__cssfix',String(now));location.replace(u.toString());}catch(_){location.reload();}}function isStyleLink(n){return n&&n.tagName==='LINK'&&n.rel==='stylesheet';}function watch(n){if(isStyleLink(n))n.addEventListener('error',reload);}function verify(){var links=Array.prototype.slice.call(document.querySelectorAll('link[rel="stylesheet"]')).filter(function(l){return /\/_next\/static\/css\//.test(l.href||'');});if(!links.length)return;var missing=links.some(function(l){return !l.sheet;});if(missing){reload();return;}var bg=getComputedStyle(document.body).backgroundColor;if(bg==='rgb(255, 255, 255)'||bg==='rgba(0, 0, 0, 0)')reload();}window.addEventListener('error',function(e){var t=e&&e.target;if(isStyleLink(t))reload();},true);new MutationObserver(function(m){m.forEach(function(r){r.addedNodes.forEach(watch);});}).observe(document.documentElement,{childList:true,subtree:true});document.querySelectorAll('link[rel="stylesheet"]').forEach(watch);window.addEventListener('load',function(){setTimeout(verify,350);setTimeout(verify,1200);});})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        <Toaster theme="dark" richColors position="top-right" />
      </body>
    </html>
  );
}
