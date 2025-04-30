import { useState, ChangeEvent } from "react";
import type { MetaFunction } from "@remix-run/node";

import Hero from "../components/hero";
import Section from "../components/section";
import Wrapper from "../components/wrapper";
import Grid from "../components/grid";
import Input from "../components/input";

import Desktop from "../images/hero_desktop_16-4-5.webp";
import Mobile from "../images/hero_mobile_1-1.webp";

import WeaponData from "../data/item_weapons.json";

import { Weapons } from "../utilities/items";

export const meta: MetaFunction = () => {
  return [
    { title: "Umbral Tools | Creator" },
    { name: "description", content: "Toolset for the ShadowDark TTRPG." },
  ];
};

export default function Creator() {

  // @TODO - functions to make
  // Trait(ancestry)
  // Title(alignment, class)
  // HitPoints(ancestry, class)
  // Modifier(attribute)
  const [character, characterUpdate] = useState({
    name: "",
    ancestry: "",
    background: "",
    deity: "",
    alignment: "",
    class: "",
    level: 0,
    attributes: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      chr: 10
    },
    talents_spells: "",
    xp: 0,
    money: {
      gp: 0,
      sp: 0,
      cp: 0
    },
    equipment: {
      head: "",
      back: "",
      neck: "",
      body: "",
      arms: "",
      hands_primary: {
        name: "none",
      },
      hands_secondary: {
        name: "none",
      },
      waist: "",
      feet: "",
      accessory: "",
      misc: ""
    },
    inventory: {
      slot_01: "",
      slot_02: "",
      slot_03: "",
      slot_04: "",
      slot_05: "",
      slot_06: "",
      slot_07: "",
      slot_08: "",
      slot_09: "",
      slot_10: "",
      slot_11: "",
      slot_12: "",
      slot_13: "",
      slot_14: "",
      slot_15: "", 
    }
  });
  
  return (
    <>
    
    <Hero 
      theme="muted" 
      imgDesktop={Desktop} 
      imgDesktopHeight={540} 
      imgDesktopWidth={1920} 
      imgMobile={Mobile} 
      imgMobileHeight={1080} 
      imgMobileWidth={1080} 
      title="Creator" 
      logo={false} 
      animation={false} 
    />
    
    <Wrapper>
      <Grid gap={32} desktop={2} tablet={2}>
          
        <div className="page left">

          {/* character */}
          <Section padding="creator" title="Character">
            
            <div className="block">Name, Ancestry, Ancestry Bonus, Background, Alignment, and Deity</div>
            
          </Section>
          
          {/* attributes */}
          <Section padding="creator" title="Attributes">
            
            <div className="block">STR, DEX, CON, INT, WIS, and CHR</div>
            
          </Section>
          
          {/* class */}
          <Section padding="creator" title="Class">
            
            <div className="block">Class, Level, and Title</div>
            
          </Section>
          
          {/* hit points */}
          <Section padding="creator" title="Hit Points">
            
            <div className="block">Hit Points</div>
            
          </Section>
          
          {/* talents / spells */}
          <Section padding="creator" title="Talents / Spells">
            
            <div className="block">Talents and Spells</div>
            
          </Section>
            
        </div>
          
        <div className="page right">
          
          {/* armor */}
          <Section padding="creator" title="Armor">
            
            <div className="block">Armor and Shield</div>
            
          </Section>
          
          {/* weapons */}
          <Section padding="creator" title="Weapons">
                
            {/* weapon : primary */}
            <div className="block">
              <Input 
                type="select" 
                id="weapon1" 
                label="Weapon (A)"
                change={(event: ChangeEvent<HTMLSelectElement>) => characterUpdate({
                  ...character,
                  equipment: {
                    ...character.equipment,
                    hands_primary: {
                      ...character.equipment.hands_primary,
                      name: event.target.value
                    }
                  }
                })}
              >
                {/* @ TODO - filter core vs custom needed */}
                <option value="None">-</option>
                {WeaponData.map((item, index) => {
                  if (item.source === "core") {
                    return(
                      <option value={item.name} key={index}>
                        {item.name}
                      </option>
                    );
                  }
                })}
              </Input>
              <div className="block__item">{Weapons(WeaponData, character.equipment.hands_primary.name, "type")}</div>
              <div className="block__item">{Weapons(WeaponData, character.equipment.hands_primary.name, "range")}</div>
              <div className="block__item block__item--large">{Weapons(WeaponData, character.equipment.hands_primary.name, "damage")}</div>
              <div className="block__item block__item--small">{Weapons(WeaponData, character.equipment.hands_primary.name, "properties")}</div>
            </div>
              
            {/* weapon : secondary */}
            <div className="block">
              <Input 
                type="select" 
                id="weapon2" 
                label="Weapon (B)"
                change={(event: ChangeEvent<HTMLSelectElement>) => characterUpdate({
                  ...character,
                  equipment: {
                    ...character.equipment,
                    hands_secondary: {
                      ...character.equipment.hands_secondary,
                      name: event.target.value
                    }
                  }
                })}
              >
                {/* @ TODO - filter core vs custom needed */}
                <option value="None">-</option>
                {WeaponData.map((item, index) => {
                  if (item.source === "core") {
                    return(
                      <option value={item.name} key={index}>
                        {item.name}
                      </option>
                    );
                  }
                })}
              </Input>
              <div className="block__item">{Weapons(WeaponData, character.equipment.hands_secondary.name, "type")}</div>
              <div className="block__item">{Weapons(WeaponData, character.equipment.hands_secondary.name, "range")}</div>
              <div className="block__item block__item--large">{Weapons(WeaponData, character.equipment.hands_secondary.name, "damage")}</div>
              <div className="block__item block__item--small">{Weapons(WeaponData, character.equipment.hands_secondary.name, "properties")}</div>
            </div>
            
          </Section>
          
          {/* equipment */}
          <Section padding="creator" title="Equipment">
            
            <div className="block">Head, Back, Neck, Arms, Accessory, Waist, Feet, and Misc</div>
            
          </Section>
          
          {/* inventory */}
          <Section padding="creator" title="Inventory">
            
            <div className="block">10 + CON modifier slots</div>
            
          </Section>
          
        </div>

      </Grid>
    </Wrapper>
    
    </>
  );

}