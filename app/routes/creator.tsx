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
      hands: {
        name: "none",
        type: "",
        damage: "",
        bonus: 0,
        benefit: "",
        additional: ""
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
    
    <Section>
      <Wrapper>
        <Grid desktop={2} tablet={2}>
          <div className="left">
            <div className="block">
              <Input 
                type="select" 
                id="weapon1" 
                label="Weapon (A)"
                change={(event: ChangeEvent<HTMLSelectElement>) => characterUpdate({
                  ...character,
                  equipment: {
                    ...character.equipment,
                    hands: {
                      ...character.equipment.hands,
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
              <div className="block__item">{Weapons(WeaponData, character.equipment.hands.name, "type")}</div>
              <div className="block__item">{Weapons(WeaponData, character.equipment.hands.name, "range")}</div>
              <div className="block__item block__item--large">{Weapons(WeaponData, character.equipment.hands.name, "damage")}</div>
              <div className="block__item block__item--small">{Weapons(WeaponData, character.equipment.hands.name, "properties")}</div>
            </div>
          </div>
          <div className="right">
            
          </div>
        </Grid>
      </Wrapper>
    </Section>
    
    </>
  );

}