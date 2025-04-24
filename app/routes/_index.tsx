import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Umbral Tools" },
    { name: "description", content: "Toolset for the ShadowDark TTRPG." },
  ];
};

export default function Index() {

  return (
    <div className="">
      <h1 heading="1">Hello World</h1>
      <p>This is a sentence to validate fonts.</p>
    </div>
  );

}