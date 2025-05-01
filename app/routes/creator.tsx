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
import ArmorData from "../data/item_armors.json";
import ShieldData from "../data/item_shields.json";

import { ArmorClass, Weapons, Armors } from "../utilities/utilities";

export const meta: MetaFunction = () => {
  return [
    { title: "Umbral Tools | Creator" },
    { name: "description", content: "Toolset for the ShadowDark TTRPG." },
  ];
};

export default function Creator() {

  const [source, sourceUpdate] = useState("core");
  
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
      armor: "none",
      shield: "none",
      arms: "",
      hands_primary: "none",
      hands_secondary: "none",
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
          
          {/* talents / Feats */}
          <Section padding="creator" title="Talents / Feats">
            
            <div className="block">Talents / Feats</div>
            
          </Section>
          
          {/* Spells */}
          <Section padding="creator" title="Spells">
            
            <div className="block">Known spells</div>
            
          </Section>
            
        </div>
          
        <div className="page right">

          {/* armor + shield */}
          <Section padding="creator" title="Armor">
            
            <div className="block">
              <Input 
                type="select" 
                id="armor" 
                label="Armor"
                change={(event: ChangeEvent<HTMLSelectElement>) => characterUpdate({
                  ...character,
                  equipment: {
                    ...character.equipment,
                    armor: event.target.value
                  }
                })}
              >
                <option value="None">-</option>
                {ArmorData.map((item, index) => {
                  if (item.source === source || source === "*") {
                    return(
                      <option value={item.name} key={index}>
                        {item.name}
                      </option>
                    );
                  }
                })}
              </Input>
              <Input 
                type="select" 
                id="shield" 
                label="Shield"
                change={(event: ChangeEvent<HTMLSelectElement>) => characterUpdate({
                  ...character,
                  equipment: {
                    ...character.equipment,
                    shield: event.target.value
                  }
                })}
              >
                <option value="None">-</option>
                {ShieldData.map((item, index) => {
                  if (item.source === source || source === "*") {
                    return(
                      <option value={item.name} key={index}>
                        {item.name}
                      </option>
                    );
                  }
                })}
              </Input>
            </div>
            
            {/* armor class */}
            <div className="block">
              <div className="block__item">
                {ArmorClass(
                  0, // modifier
                  Armors(ArmorData, character.equipment.armor, "ac"), 
                  Armors(ArmorData, character.equipment.armor, "dex"),
                  Armors(ShieldData, character.equipment.shield, "ac"),
                  0, // accessory
                  0 // class
                )}
              </div>
              <div className="block__item block__item--full">
                {Armors(ArmorData, character.equipment.armor, "properties")}
              </div>
            </div>
            
          </Section>
          
          {/* weapons */}
          <Section padding="creator" title="Weapons">
                
            {/* weapon : primary */}
            <div className="block">
              <Input 
                type="select" 
                id="weapon-primary" 
                label="Weapon (A)"
                change={(event: ChangeEvent<HTMLSelectElement>) => characterUpdate({
                  ...character,
                  equipment: {
                    ...character.equipment,
                    hands_primary: event.target.value
                  }
                })}
              >
                <option value="None">-</option>
                {WeaponData.map((item, index) => {
                  if (item.source === source || source === "*") {
                    return(
                      <option value={item.name} key={index}>
                        {item.name}
                      </option>
                    );
                  }
                })}
              </Input>
              <div className="block__item">
                {Weapons(WeaponData, character.equipment.hands_primary, "type")}
              </div>
              <div className="block__item">
                {Weapons(WeaponData, character.equipment.hands_primary, "range")}
              </div>
              <div className="block__item block__item--small">
                {Weapons(WeaponData, character.equipment.hands_primary, "properties")}
              </div>
            </div>
            
            <div className="block">
              {/*
                Attack bonus: MOD + CLASS + ITEM + MISC
                MOD = STR, unless "F" or "Th", then STR or DEX, whichever is higher
              */}
              <div className="block__item">0</div>
              <div className="block__item block__item--full">
                {Weapons(WeaponData, character.equipment.hands_primary, "damage")}
              </div>
            </div>
              
            {/* weapon : secondary */}
            <div className="block">
              <Input 
                type="select" 
                id="weapon-secondary" 
                label="Weapon (B)"
                change={(event: ChangeEvent<HTMLSelectElement>) => characterUpdate({
                  ...character,
                  equipment: {
                    ...character.equipment,
                    hands_secondary: event.target.value
                  }
                })}
              >
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
              <div className="block__item">
                {Weapons(WeaponData, character.equipment.hands_secondary, "type")}
              </div>
              <div className="block__item">
                {Weapons(WeaponData, character.equipment.hands_secondary, "range")}
              </div>
              <div className="block__item block__item--small">
                {Weapons(WeaponData, character.equipment.hands_secondary, "properties")}
              </div>
            </div>
            
            <div className="block">
              <div className="block__item">0</div>
              <div className="block__item block__item--full">
                {Weapons(WeaponData, character.equipment.hands_secondary, "damage")}
              </div>
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