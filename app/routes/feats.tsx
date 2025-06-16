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

import FeatsData from "../data/feats.json";

export const meta: MetaFunction = () => {
  return [
    { title: "Feats | Umbral Tools" },
    { name: "description", content: "Custom feats for Umbral Tools games." },
  ];
};

export default function Feats() {

  const featTypes = ["combat", "magical", "general", "*"];
  
  const [alpha, alphaUpdate] = useState("*");
  const [type, typeUpdate] = useState("*");
  
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
      title="Feats" 
      logo={false} 
      animation={false} 
    />

    <Section padding="bottom">
      <Wrapper>
        
        <nav className="filters" aria-label="Item filters" role="navigation">
          
          <Dialog type="secondary" triggerCopy="Filters" triggerButton="primary">
            
            <Tabs 
              data={featTypes} 
              state={type} 
              update={typeUpdate}
            >
              <h3 className="tabs__title" heading="5">Type</h3>
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
          {FeatsData.sort((a, b) => a.name < b.name ? -1 : 1).map((feat, index) => { 
            
            let alphaFilter = feat.name.charAt(0);
            let typeFilter = feat.type;
            
            // alphabetical filter
            if (alphaFilter !== alpha && alpha !== "*") return null;
            
            // type filter
            if (typeFilter.toLowerCase() !== type && type !== "*") return null;
            
            return(
              <Card 
                key={index} 
                theme="feats" 
                title={feat.name} 
                copy1={feat.description} 
                copy2={feat.action} 
                copy3={feat.type} 
                copy4={feat.stacking === true ? "Stacks : Yes" : "Stacks : No"}
              />
            );
            
          })}
        </Grid>
        
      </Wrapper>
    </Section>
      
    </>
  );
  
}