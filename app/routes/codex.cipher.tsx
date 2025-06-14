import type { MetaFunction } from "@remix-run/node";

import Hero from "../components/hero";
import Section from "../components/section";
import Wrapper from "../components/wrapper";

import Desktop from "../images/hero_desktop_16-4-5.webp";
import Mobile from "../images/hero_mobile_1-1.webp";

export const meta: MetaFunction = () => {
  return [
    { title: "Cipher | Codex | Umbral Tools" },
    { name: "description", content: "Cipher custom class for Umbral Tools games." },
  ];
};

export default function Codex() {

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
      title="Cipher" 
      logo={false} 
      animation={false} 
    />
    
    <Section>
      <Wrapper>
        Coming soon.
      </Wrapper>
    </Section>
    
    </>
  );
  
}