import type { MetaFunction } from "@remix-run/node";

import Hero from "../components/hero";
import Section from "../components/section";
import Wrapper from "../components/wrapper";
import Grid from "../components/grid";
import Card from "../components/card";

import Desktop from "../images/hero_desktop_16-4-5.webp";
import Mobile from "../images/hero_mobile_1-1.webp";

import FeatsData from "../data/feats.json";

export const meta: MetaFunction = () => {
  return [
    { title: "Feats | Umbral Tools" },
    { name: "description", content: "Toolset for the ShadowDark TTRPG." },
  ];
};

export default function Feats() {
 
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

    <Section>
      <Wrapper>
        <Grid desktop={2} tablet={2}>
          {FeatsData.sort((a, b) => a.name < b.name ? -1 : 1).map((feat, index) => { 
            return(
              <Card 
                key={index} 
                theme="feats" 
                title={feat.name} 
                copy1={feat.description} 
                copy2={feat.action} 
                copy3={feat.type} 
                copy4={feat.stacking === true ? "Stacks : True" : "Stacks : False"}
              />
            );
          })}
        </Grid>
      </Wrapper>
    </Section>
      
    </>
  );
  
}