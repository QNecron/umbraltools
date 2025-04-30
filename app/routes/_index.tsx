import type { MetaFunction } from "@remix-run/node";

import Section from "../components/section";
import Wrapper from "../components/wrapper";
import Grid from "../components/grid";
import Card from "../components/card";
import Hero from "../components/hero";

import CardData from "../data/home.json";

import ContentCard from "../images/card_1-1.webp";

export const meta: MetaFunction = () => {
  return [
    { title: "Umbral Tools" },
    { name: "description", content: "Toolset for the ShadowDark TTRPG." },
  ];
};

export default function Index() {

  return (
    <>

    <Hero theme="muted animate" title="Umbral Tools" logo={true} animation={true} />
    
    <Section padding="top">
      <Wrapper>
        <Grid>
          {CardData.map((card, index) => {
            return(
              <Card 
                key={index} 
                theme="muted overlay"
                image={ContentCard}
                imageHeight={672} 
                imageWidth={672} 
                title={card.title} 
                copy1={card.copy} 
                ctaUrl={card.ctaUrl}
                ctaCopy={card.ctaCopy} 
              />
            );
          })}
        </Grid>
      </Wrapper>      
    </Section>

    </>
  );

}