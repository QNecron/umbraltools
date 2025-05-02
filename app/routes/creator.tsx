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
import WondrousData from "../data/item_wondrous.json";

import { ArmorClass, Weapons, Armors } from "../utilities/utilities";

export const meta: MetaFunction = () => {
  return [
    { title: "Umbral Tools | Creator" },
    { name: "description", content: "Toolset for the ShadowDark TTRPG." },
  ];
};

export default function Creator() {
  
  const WondrousItems = ["head", "back", "arms", "neck", "waist", "feet", "accessory", "misc"];

  const InventorySlots = ["slot_1", "slot_2", "slot_3", "slot_4", "slot_5", "slot_6", "slot_7", "slot_8", "slot_9", "slot_10"];
  
  // InventorySlots.push(11, 12);
  
  const [source, sourceUpdate] = useState("*");
  
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
      head: "None",
      back: "None",
      neck: "None",
      armor: "None",
      shield: "None",
      arms: "None",
      hands_primary: "None",
      hands_secondary: "None",
      waist: "None",
      feet: "None",
      accessory: "None",
      misc: "None"
    },
    inventory: {
      slot_1: "None",
      slot_2: "None",
      slot_3: "None",
      slot_4: "None",
      slot_5: "None",
      slot_6: "None",
      slot_7: "None",
      slot_8: "None",
      slot_9: "None",
      slot_10: "None"
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
            
            <div className="block">
              {WondrousItems.map((item, index) => {

                function Match(prop: string) {
                  if (prop == "head") return character.equipment.head
                  if (prop == "back") return character.equipment.back
                  if (prop == "arms") return character.equipment.arms
                  if (prop == "neck") return character.equipment.neck
                  if (prop == "waist") return character.equipment.waist
                  if (prop == "feet") return character.equipment.feet
                  if (prop == "accessory") return character.equipment.accessory
                  if (prop == "misc") return character.equipment.misc
                }

                return(
                  <Input 
                    key={index} 
                    type="select" 
                    id={item} 
                    label={item}
                    value={Match(item)}
                    change={(event: ChangeEvent<HTMLSelectElement>) => characterUpdate({
                      ...character,
                      equipment: {
                        ...character.equipment,
                        [item]: event.target.value
                      }
                    })}
                  >
                    <option value="None">-</option>
                    {WondrousData.map((wondrous, index) => {
                      if (wondrous.base === item) {
                        return(
                          <option value={wondrous.name} key={index}>
                            {wondrous.name}
                          </option>
                        );
                      }
                    })}
                  </Input>
                );
                
              })}
            </div>

          </Section>
          
          {/* inventory */}
          <Section padding="creator" title="Inventory">
            
            <div className="block">
              {InventorySlots.map((slot, index) => {
                
                function Match(prop: string) {
                  if (prop == "slot_1") return character.inventory.slot_1
                  if (prop == "slot_2") return character.inventory.slot_2
                  if (prop == "slot_3") return character.inventory.slot_3
                  if (prop == "slot_4") return character.inventory.slot_4
                  if (prop == "slot_5") return character.inventory.slot_5
                  if (prop == "slot_6") return character.inventory.slot_6
                  if (prop == "slot_7") return character.inventory.slot_7
                  if (prop == "slot_8") return character.inventory.slot_8
                  if (prop == "slot_9") return character.inventory.slot_9
                  if (prop == "slot_10") return character.inventory.slot_10
                }
                
                return(
                  <Input 
                    key={index} 
                    type="text" 
                    id={slot} 
                    label={slot} 
                    value={Match(slot)}
                    change={(event: ChangeEvent<HTMLInputElement>) => characterUpdate({
                      ...character,
                      inventory: {
                        ...character.inventory,
                        [slot]: event.target.value
                      }
                    })}
                  />
                );
                
              })}
            </div>
            
          </Section>
          
        </div>

      </Grid>
    </Wrapper>
    
    </>
  );

}