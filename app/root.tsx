import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";

import Header from "./components/header";
import Footer from "./components/footer";

import styleTokens from "./styles/tokens.css";
import styleReset from "./styles/reset.css";
import styleCore from "./styles/core.css";

export const links: LinksFunction = () => [
  { 
    rel: "preconnect", 
    href: "https://fonts.googleapis.com" 
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Oswald:300&display=swap",
  },
  { 
    rel: "stylesheet", 
    href: styleTokens 
  },
  { 
    rel: "stylesheet", 
    href: styleReset 
  },
  { 
    rel: "stylesheet", 
    href: styleCore 
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <main id="main" role="main">
          {children}
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
  
}

export default function App() {
  return <Outlet />;
}
