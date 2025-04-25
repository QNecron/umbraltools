import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import Wrapper from "../components/wrapper";
import Hero from "../components/hero";

import CardData from "../data/home.json";

export const meta: MetaFunction = () => {
  return [
    { title: "Umbral Tools" },
    { name: "description", content: "Toolset for the ShadowDark TTRPG." },
  ];
};

export default function Index() {

  return (
    <>

    <Hero title="Umbral Tools" logo={true} animation={true} />
    
    {/* @TODO - section + wrapper + grid + card component */}
    <Wrapper>
      {CardData.map((card, index) => {
        return(
          <div key={index}>
            {/* <img src={card.image} /> */}
            <div>{card.title}</div>
            <div>{card.copy}</div>
            <Link to={card.ctaUrl}>{card.ctaCopy}</Link>
          </div>
        );
      })}
    </Wrapper>

    </>
  );

}