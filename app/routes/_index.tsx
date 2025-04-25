import type { MetaFunction } from "@remix-run/node";

import Hero from "../components/hero";

export const meta: MetaFunction = () => {
  return [
    { title: "Umbral Tools" },
    { name: "description", content: "Toolset for the ShadowDark TTRPG." },
  ];
};

export default function Index() {

  return (
    <>
    <Hero title="Umbral Tools" logo={true} animation={false} />
    
    <div>
      <h2 heading="2">Hello World</h2>
      <p>This is a sentence to validate fonts.</p>
    </div>
    </>
  );

}