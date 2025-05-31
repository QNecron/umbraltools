import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";

import Hero from "../components/hero";
import Section from "../components/section";
import Wrapper from "../components/wrapper";
import Grid from "../components/grid";
import Card from "../components/card";

import Desktop from "../images/hero_desktop_16-4-5.webp";
import Mobile from "../images/hero_mobile_1-1.webp";

import ItemArmors from "../data/item_armors.json";
import ItemShields from "../data/item_shields.json";
import ItemWeapons from "../data/item_weapons.json";
import ItemWondrous from "../data/item_wondrous.json";

export const meta: MetaFunction = () => {
  return [
    { title: "Magic Items | Umbral Tools" },
    { name: "description", content: "Toolset for the ShadowDark TTRPG." },
  ];
};

export default function Feats() {
 
  const [alpha, alphaUpdate] = useState("*")
  const [source, sourceUpdate] = useState("custom")
  const [base, baseUpdate] = useState("*")
  
  // given the data is nearly identical.. @TODO - circle back to this "any"
  const ItemsData = ([] as any[]).concat(ItemArmors, ItemShields, ItemWeapons, ItemWondrous);
  
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
      title="Magic Items" 
      logo={false} 
      animation={false} 
    />

    <Section>
      <Wrapper>
        <Grid desktop={2} tablet={2}>
          {ItemsData.sort((a, b) => a.name < b.name ? -1 : 1).map((item, index) => { 
            
            let alphaFilter = item.name.charAt(0);
            let sourceFilter = item.source;
            let baseFilter = item.base;
            
            // alphabetical filter
            if (alphaFilter !== alpha && alpha !== "*") return null;

            // source filter
            if (sourceFilter !== source && source !== "*") return null;

            // base filter
            if (baseFilter !== base && base !== "*") return null;
            
            // @TODO - might rethink how I determine what's an armor/shield/weapon vs others.
            let ItemBonus = "";
            
            if (item.bonus >= 0) {
              ItemBonus = (item.bonus > 0 ? "+" + item.bonus : "+0") + " " + item.base;
            }
            
            let ItemBenefit = <> <strong>Benefit.</strong> {item.benefit} </>;
            
            let ItemAdditional = <> <strong>Additional.</strong> {item.additional} </>;
            
            return(
              <Card 
                key={index} 
                theme="items" 
                title={item.name} 
                copy1={item.description}
                copy2={ItemBonus} 
                copy3={ItemBenefit} 
                copy4={!item.additional ? null : ItemAdditional} 
              />
            );
          })}
        </Grid>
      </Wrapper>
    </Section>
      
    </>
  );
  
}