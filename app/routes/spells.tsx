import type { MetaFunction } from "@remix-run/node";

import Hero from "../components/hero";
import Section from "../components/section";
import Wrapper from "../components/wrapper";
import Grid from "../components/grid";
import Card from "../components/card";

import Desktop from "../images/hero_desktop_16-4-5.webp";
import Mobile from "../images/hero_mobile_1-1.webp";

import SpellsData from "../data/spells.json";

export const meta: MetaFunction = () => {
  return [
    { title: "Spells | Umbral Tools" },
    { name: "description", content: "Toolset for the ShadowDark TTRPG." },
  ];
};

export default function Spells() {
 
  return(
    <>

    <Hero 
      theme="muted" 
      imgDesktop={Desktop} 
      imgDesktopHeight={540} 
      imgDesktopWidth={1920} 
      imgMobile={Mobile} 
      imgMobileHeight={1080} 
      imgMobileWidth={1080} 
      title="Spells" 
      logo={false} 
      animation={false} 
    />

    <Section>
      <Wrapper>
        <Grid>
          {SpellsData.sort((a, b) => a.name < b.name ? -1 : 1).map((spell, index) => {
                        
            let spellClass = <> <strong>Class:</strong> {spell.class} </>;
            
            let spellDuration = <> <strong>Duration:</strong> {spell.duration} </>;

            let spellRange = <> <strong>Range:</strong> {spell.range} </>;
            
            return(
              <Card 
                key={index} 
                theme="spells" 
                title={spell.name} 
                badge={spell.tier}
                copy1={spellClass}
                copy2={spellDuration}
                copy3={spellRange}
                copy4={spell.description_1} 
                copy5={spell.description_2}
              />
            );
          })}
        </Grid>
      </Wrapper>
    </Section>
      
    </>
  );
  
}