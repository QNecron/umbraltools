import { useState, ChangeEvent } from "react";
import type { MetaFunction } from "@remix-run/node";

import Hero from "../components/hero";
import Section from "../components/section";
import Wrapper from "../components/wrapper";
import Grid from "../components/grid";
import Input from "../components/input";
import Icons from "../components/icons";

import Desktop from "../images/hero_desktop_16-4-5.webp";
import Mobile from "../images/hero_mobile_1-1.webp";

import EquipmentData from "../data/item_slots.json";
import WeaponData from "../data/item_weapons.json";
import ArmorData from "../data/item_armors.json";
import ShieldData from "../data/item_shields.json";
import WondrousData from "../data/item_wondrous.json";

import BackgroundData from "../data/backgrounds.json";
import AncestryData from "../data/ancestries.json";
import AlignmentData from "../data/alignments.json";
import AttributeData from "../data/attributes.json";
import ClassesData from "../data/classes.json";
import FeatsData from "../data/feats.json";

import { AncestryBonus, Modifier, ArmorClass, HitDie, DiceRoll, Total, Weapons, Armors } from "../utilities/utilities";

export const meta: MetaFunction = () => {
  return [
    { title: "Umbral Tools | Creator" },
    { name: "description", content: "Toolset for the ShadowDark TTRPG." },
  ];
};

export default function Creator() {
    
  const [source, sourceUpdate] = useState("*");
  
  // @TODO - functions to make:
  // Trait(ancestry)
  // Title(alignment, class)
  // Modifier(attribute)
  const [character, characterUpdate] = useState({
    name: "",
    ancestry: "",
    background: "",
    deity: "",
    alignment: "",
    class: "",
    title: "",
    level: "0",
    hit_points: "0",
    attributes: {
      str: "10",
      dex: "10",
      con: "10",
      int: "10",
      wis: "10",
      chr: "10"
    },
    talents_feats: "",
    spells: "",
    xp: "0",
    money: {
      gp: "0",
      sp: "0",
      cp: "0"
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
    inventory: ""
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
          
        <div className="grid__column">

          {/* character */}
          <Section padding="creator" title="Character">
            
            <div className="block">
              <Input 
                type="text" 
                id="name" 
                label="Name" 
                value={character.name}
                change={(event: ChangeEvent<HTMLInputElement>) => characterUpdate({
                  ...character,
                  name: event.target.value
                })}
              />
              <Input 
                type="select" 
                id="background" 
                label="Background" 
                value={character.background} 
                change={(event: ChangeEvent<HTMLSelectElement>) => characterUpdate({
                  ...character,
                  background: event.target.value
                })}
              >
                <option value="None">-</option>
                {BackgroundData.map((background, index) => {
                  return(
                    <option value={background} key={index}>
                      {background}
                    </option>
                  );
                })}
              </Input>
            </div>
            
            <div className="block">
              <Input 
                type="select" 
                id="ancestry" 
                label="Ancestry" 
                value={character.ancestry} 
                change={(event: ChangeEvent<HTMLSelectElement>) => characterUpdate({
                  ...character,
                  ancestry: event.target.value
                })}
              >
                <option value="None">-</option>
                {AncestryData.map((race, index) => {
                  return(
                    <option value={race.ancestry} key={index}>
                      {race.ancestry}
                    </option>
                  );
                })}
              </Input>
              <div className="block__item block__item--full">
                {AncestryBonus(AncestryData, character.ancestry)}
              </div>
            </div>
            
            <div className="block">
              <Input 
                type="select" 
                id="alignment" 
                label="Alignmeny" 
                value={character.alignment} 
                change={(event: ChangeEvent<HTMLSelectElement>) => characterUpdate({
                  ...character,
                  alignment: event.target.value
                })}
              >
                <option value="None">-</option>
                {AlignmentData.map((alignment, index) => {
                  return(
                    <option value={alignment} key={index}>
                      {alignment}
                    </option>
                  );
                })}
              </Input>
              <Input 
                type="text" 
                id="deity" 
                label="Deity" 
                value={character.deity}
                change={(event: ChangeEvent<HTMLInputElement>) => characterUpdate({
                  ...character,
                  deity: event.target.value
                })}
              />
            </div>
            
          </Section>
          
          {/* attributes */}
          <Section padding="creator" title="Attributes">
                        
            {AttributeData.map((stat, index) => {
              
              function Ability(stat: string) {
                if (stat === "str") return character.attributes.str;
                else if (stat === "dex") return character.attributes.dex;
                else if (stat === "con") return character.attributes.con;
                else if (stat === "int") return character.attributes.int;
                else if (stat === "wis") return character.attributes.wis;
                else if (stat === "chr") return character.attributes.chr;
                else return "error";                
              }
    
              return(
                <div className="block" key={index}>
                  <div className="block__item block__item--tiny" heading="5">{stat}</div>
                  <div className="block__item">
                    {Modifier(Ability(stat), "0", "0")}
                  </div>
                  <Input 
                    type="number" 
                    id={stat}
                    label={stat} 
                    minimal={true} 
                    value={Ability(stat)} 
                    change={(event: ChangeEvent<HTMLInputElement>) => characterUpdate({
                      ...character,
                      attributes: {
                        ...character.attributes,
                        [stat]: event.target.value
                      }
                    })}
                  />
                  <button className="btn" button="icon primary" onClick={(e) => characterUpdate({
                    ...character,
                    attributes: {
                      ...character.attributes,
                      [stat]: DiceRoll("d6", 3).toString()
                    }
                  })}>
                    <span className="srt">Roll 3d6 to determine {stat}</span>
                    <Icons icon="dice" />
                  </button>
                </div>
              );
              
            })}
            
          </Section>
          
          {/* class + title */}
          <Section padding="creator" title="Class">
            
            <div className="block">
              <div className="block__item">
                {HitDie(character.class)}
              </div>
              <Input 
                type="select" 
                id="class" 
                label="Class" 
                value={character.class} 
                change={(event: ChangeEvent<HTMLSelectElement>) => characterUpdate({
                  ...character,
                  class: event.target.value
                })}
              >
                <option value="None">-</option>
                {ClassesData.map((role, index) => {
                  return(
                    <option value={role.class} key={index}>
                      {role.class}
                    </option>
                  );
                })}
              </Input>
              <Input 
                type="text" 
                id="title" 
                label="Title" 
                value={character.title}
                change={(event: ChangeEvent<HTMLInputElement>) => characterUpdate({
                  ...character,
                  title: event.target.value
                })}
              />
              
            </div>
            
          </Section>
          
          {/* hit points */}
          <Section padding="creator hitpoints" title="Hit Points">
            
            <div className="block">
              <div className="block__item">
                {Total(
                  "0", 
                  character.hit_points, 
                  character.ancestry === "Dwarf" ? "2" : "0", 
                  "0"
                )}
              </div>
              <Input 
                type="number" 
                id="level" 
                label="Level" 
                value={character.level} 
                change={(event: ChangeEvent<HTMLInputElement>) => characterUpdate({
                  ...character,
                  level: event.target.value
                })}
              />
              <Input 
                type="number" 
                id="hitpoints" 
                label="Hit Points" 
                value={character.hit_points} 
                change={(event: ChangeEvent<HTMLInputElement>) => characterUpdate({
                  ...character,
                  hit_points: event.target.value
                })}
              />
              <button className="btn" button="icon primary" onClick={(e) => characterUpdate({
                ...character,
                hit_points: DiceRoll(HitDie(character.class), parseInt(character.level)).toString()
              })}>
                <span className="srt">Roll hit die times level to determine hit points</span>
                <Icons icon="dice" />
              </button>
            </div>
            
          </Section>
          
          {/* talents / Feats */}
          <Section padding="creator" title="Talents / Feats">
            
            <div className="block">
              <Input 
                type="textarea" 
                id="talents_feats" 
                label="Talents / Feats" 
                value={character.talents_feats}
                change={(event: ChangeEvent<HTMLTextAreaElement>) => characterUpdate({
                  ...character,
                  talents_feats: event.target.value
                })}
              />  
            </div>
            
          </Section>
          
          {/* Spells */}
          <Section padding="creator" title="Spells">
            
            <div className="block">
              <Input 
                type="textarea" 
                id="spells" 
                label="Spells" 
                value={character.spells}
                change={(event: ChangeEvent<HTMLTextAreaElement>) => characterUpdate({
                  ...character,
                  spells: event.target.value
                })}
              />  
            </div>
            
          </Section>
            
        </div>
          
        <div className="grid__column">

          {/* armor + shield */}
          <Section padding="creator" title="Armor">
            
            <div className="block">
              <Input 
                type="select" 
                id="armor" 
                label="Armor" 
                value={character.equipment.armor} 
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
                value={character.equipment.shield} 
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
                value={character.equipment.hands_primary} 
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
                value={character.equipment.hands_secondary} 
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

            {EquipmentData.map((item, index) => {

              function Match(prop: string) {
                if (prop == "head") return character.equipment.head;
                else if (prop == "back") return character.equipment.back;
                else if (prop == "arms") return character.equipment.arms;
                else if (prop == "neck") return character.equipment.neck;
                else if (prop == "waist") return character.equipment.waist;
                else if (prop == "feet") return character.equipment.feet;
                else if (prop == "accessory") return character.equipment.accessory;
                else if (prop == "misc") return character.equipment.misc;
                else return "error";
              }

              return(
                <div className="block">
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
                    {WondrousData.sort((a, b) => a.name < b.name ? -1 : 1).map((wondrous, index) => {
                      if (wondrous.base === item) {
                        return(
                          <option value={wondrous.name} key={index}>
                            {wondrous.name}
                          </option>
                        );
                      }
                    })}
                  </Input>
                  <button className="btn" button="icon primary" onClick={(e) => null }>
                    <span className="srt">Item information</span>
                    <Icons icon="reader" />
                  </button>
                </div>
              );

            })}
            
          </Section>
          
          {/* inventory */}
          <Section padding="creator" title="Inventory">
            
            <div className="block">
              <Input 
                type="textarea" 
                id="inventory" 
                label="Inventory" 
                value={character.inventory}
                change={(event: ChangeEvent<HTMLTextAreaElement>) => characterUpdate({
                  ...character,
                  inventory: event.target.value
                })}
              />  
            </div>

          </Section>
          
        </div>

      </Grid>
    </Wrapper>
    
    </>
  );

}