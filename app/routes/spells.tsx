import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";

import Hero from "../components/hero";
import Section from "../components/section";
import Wrapper from "../components/wrapper";
import Grid from "../components/grid";
import Card from "../components/card";
import Dialog from "../components/dialog";
import Tabs from "../components/tabs";

import Desktop from "../images/hero_desktop_16-4-5.webp";
import Mobile from "../images/hero_mobile_1-1.webp";

import Alphabet from "../data/alphabet.json";

import SpellCasters from "../data/spell_casters.json";
import SpellTiers from "../data/spell_tiers.json";
import SpellsData from "../data/spells.json";

export const meta: MetaFunction = () => {
  return [
    { title: "Spells | Umbral Tools" },
    { name: "description", content: "Custom spells for Umbral Tools games." },
  ];
};

export default function Spells() {
 
  const [alpha, alphaUpdate] = useState("*");
  const [source, sourceUpdate] = useState("custom");
  const [caster, casterUpdate] = useState("*");
  const [level, levelUpdate] = useState("1");
  
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
    />

    <Section padding="bottom">
      <Wrapper>

        <nav className="filters" aria-label="Item filters" role="navigation">
          
          <Dialog type="secondary" triggerCopy="Filters" triggerButton="primary">
            
            <Tabs 
              data={SpellCasters} 
              state={caster} 
              update={casterUpdate}
            >
              <h3 className="tabs__title" heading="5">Class</h3>
            </Tabs>
            
            <Tabs 
              classes="condensed" 
              data={SpellTiers} 
              state={level} 
              update={levelUpdate}
            >
              <h3 className="tabs__title" heading="5">Tier</h3>
            </Tabs>
            
            <Tabs 
              classes="condensed" 
              data={Alphabet} 
              state={alpha} 
              update={alphaUpdate}
            >
              <h3 className="tabs__title" heading="5">Name</h3>
            </Tabs>
          
          </Dialog>
          
        </nav>
        
        <Grid>
          {SpellsData.sort((a, b) => a.name < b.name ? -1 : 1).map((spell, index) => {
            
            let alphaFilter = spell.name.charAt(0);
            let sourceFilter = spell.source;
            let casterFilter = spell.class;
            let levelFilter = spell.tier.toString();
            
            // alphabetical filter
            if (alphaFilter !== alpha && alpha !== "*") return null;
            
            // source filter
            if (sourceFilter !== source && source !== "*") return null;
            
            // caster filter
            if (casterFilter !== caster && caster !== "*") return null;
            
            // level filter
            if (levelFilter !== level && level !== "*") return null;

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
                copy6={spell.description_3}
              />
            );
          })}
        </Grid>
      </Wrapper>
    </Section>
      
    </>
  );
  
}
