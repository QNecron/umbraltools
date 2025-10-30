import { useState, useEffect, ChangeEvent, Fragment } from "react";
import type { MetaFunction } from "@remix-run/node";

import Hero from "../components/hero";
import Section from "../components/section";
import Wrapper from "../components/wrapper";
import Grid from "../components/grid";
import Input from "../components/input";
import Icons from "../components/icons";
import Dialog from "../components/dialog";
import Accordion from "../components/accordion";

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
import RitualData from "../data/rituals.json";

import { 
  SaveCharacter, 
  LoadCharacter, 
  DeleteCharacter, 
  AncestryBonus, 
  Modifier, 
  ArmorClass, 
  HitDie, 
  Attack, 
  Damage, 
  Spellcasting, 
  IsCaster, 
  HasRitual,
  HitPoints, 
  SavingThrows,
  DiceRoll, 
  Total, 
  Weapons, 
  Armors,
  ItemInformation,
  LoadFile
} from "../utilities/utilities";

export const meta: MetaFunction = () => {
  return [
    { title: "Creator | Umbral Tools" },
    { name: "description", content: "Character creator for Umbral Tools games." },
  ];
};

export default function Creator() {
    
  const [character, characterUpdate] = useState({
    name: "",
    ancestry: "",
    background: "",
    deity: "",
    alignment: "",
    class: "",
    title: "",
    level: "1",
    hit_points: "1",
    attributes: {
      str: "10",
      dex: "10",
      con: "10",
      int: "10",
      wis: "10",
      chr: "10"
    },
    talents_feats: {
      level_0: "",
      level_1: "",
      level_2: "",
      level_3: "",
      level_4: "",
      level_5: "",
      level_6: "",
      level_7: "",
      level_8: "",
      level_9: "",
      level_10: ""
    },
    spells: "",
    rituals: {
      ritual_0: "",
      ritual_1: ""
    },
    xp: "0",
    luck_tokens: "0",
    money: {
      gp: "0",
      sp: "0",
      cp: "0"
    },
    equipment: {
      head: "",
      back: "",
      neck: "",
      armor: "",
      shield: "",
      arms: "",
      hands_primary: "",
      hands_secondary: "",
      waist: "",
      feet: "",
      accessory: "",
      misc: ""
    },
    inventory: "",
    notes: ""
  });
  
  const [characterSaved, characterSavedUpdate] = useState<any[]>([]);
    
  const CreatorUpdate = (data: any) => {
    
    characterUpdate({
      ...character,
      name: data.name,
      ancestry: data.ancestry,
      background: data.background,
      deity: data.deity,
      alignment: data.alignment,
      class: data.class,
      title: data.title,
      level: data.level,
      hit_points: data.hit_points,
      attributes: {
        ...character.attributes,
        str: data.attributes.str,
        dex: data.attributes.dex,
        con: data.attributes.con,
        int: data.attributes.int,
        wis: data.attributes.wis,
        chr: data.attributes.chr,
      },
      talents_feats: {
        ...character.talents_feats,
        level_0: data.talents_feats.level_0,
        level_1: data.talents_feats.level_1,
        level_2: data.talents_feats.level_2,
        level_3: data.talents_feats.level_3,
        level_4: data.talents_feats.level_4,
        level_5: data.talents_feats.level_5,
        level_6: data.talents_feats.level_6,
        level_7: data.talents_feats.level_7,
        level_8: data.talents_feats.level_8,
        level_9: data.talents_feats.level_9,
        level_10: data.talents_feats.level_10,
      },
      spells: data.spells,
      rituals: {
        ritual_0: data.rituals.ritual_0,
        ritual_1: data.rituals.ritual_1
      },
      xp: data.xp,
      luck_tokens: data.luck_tokens,
      money: {
        ...character.money,
        gp: data.money.gp,
        sp: data.money.sp,
        cp: data.money.cp
      },
      equipment: {
        ...character.equipment,
        head: data.equipment.head,
        back: data.equipment.back,
        neck: data.equipment.neck,
        armor: data.equipment.armor,
        shield: data.equipment.shield,
        arms: data.equipment.arms,
        hands_primary: data.equipment.hands_primary,
        hands_secondary: data.equipment.hands_secondary,
        waist: data.equipment.waist,
        feet: data.equipment.feet,
        accessory: data.equipment.accessory,
        misc: data.equipment.misc,
      },
      inventory: data.inventory,
      notes: data.notes
    });
    
  };
  
  const CharacterList = () => {
    const storage = window.localStorage;
    let list = [];

    for (var i = 0; i < storage.length; i++) {
      let key = storage.key(i);
      list.push(key);
    };
    
    characterSavedUpdate(list);
    
  };
  
  const CharacterLevel = (level: string) => {
    let count = parseInt(level);
    let levels = [];
    
    for (count; count >= 0; count--) {
      if (count !== 0) levels.push(count);
    }
    
    return levels.reverse();

  };
  
  const CharacterSave = (name: string, content: any) => {
    const file = new Blob([JSON.stringify(content)], {type: "text/plain"});
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    let date = new Date();
    let time = date.toISOString().split("T")[0];
    
    link.download = name.replace(/ /g,'').toLowerCase() + "-" + time + ".json";
    link.href = url;
    link.click();
    link.remove();
  };
  
  const EquipmentDataFull = ["hands_primary", "hands_secondary", "armor", "shield"].concat(EquipmentData);

  useEffect(() => {
    
    CharacterList();
    
  }, []);
  
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
    />
    
    <Wrapper>
      
      {/* @TODO - abstract to component ??? */}
      <nav className="filters" aria-label="Manage characters" role="navigation">
      
        <button 
          className="btn" 
          button="icon primary" 
          onClick={() => {
            SaveCharacter(character, character.name);
            CharacterList();
          }}
        >
          <span className="srt">Save character</span>
          <Icons icon="upload" />
        </button>
        
        <Dialog type="secondary" triggerCopy="Items" triggerButton="primary">
          
          {EquipmentDataFull.map((item, index) => {
            
            function MatchProp(prop: string) {
              if (prop == "hands_primary") return character.equipment.hands_primary;
              else if (prop == "hands_secondary") return character.equipment.hands_secondary;
              else if (prop == "armor") return character.equipment.armor;
              else if (prop == "head") return character.equipment.head;
              else if (prop == "back") return character.equipment.back;
              else if (prop == "neck") return character.equipment.neck;
              else if (prop == "arms") return character.equipment.arms;
              else if (prop == "waist") return character.equipment.waist;
              else if (prop == "feet") return character.equipment.feet;
              else if (prop == "accessory") return character.equipment.accessory;
              else if (prop == "misc") return character.equipment.misc;
              else return "";
            }
            
            function MatchData(prop: string) {
              switch (prop) {
                case "armor": 
                  return ArmorData;
                break;
                case "shield": 
                  return ShieldData;
                break;
                case "hands_primary":
                case "hands_secondary": 
                  return WeaponData;
                break;
                default:
                  return WondrousData;
                break;
              }
            }
            
            let itemBase = ItemInformation(MatchData(item), MatchProp(item), "base");
            let itemDescription = ItemInformation(MatchData(item), MatchProp(item), "description");
            let itemBenefit = ItemInformation(MatchData(item), MatchProp(item), "benefit");
            let itemAdditional = ItemInformation(MatchData(item), MatchProp(item), "additional");
            
            return(
              <Fragment key={index}>
                {MatchProp(item) &&
                  <Accordion
                    id={"equipment_" + item}
                    open={false}
                    accordion="updates"
                    title={MatchProp(item)}
                    button="full primary"
                  >
                    {itemBase.includes("undefined") === true ? null : (<p><em>{itemBase}</em></p>)}
                    {itemDescription ? (<p>{itemDescription}</p>) : null}
                    {itemBenefit ? (<p>{itemBenefit}</p>) : null}
                    {itemAdditional ? (<p>{itemAdditional}</p>) : null}
                  </Accordion>
                }
              </Fragment>
            );
            
          })}
          
        </Dialog>
        
        <Dialog type="secondary" triggerCopy="Characters" triggerButton="primary">
  
          {characterSaved.length !== 0  && 
            <ul className="character-list">
              {characterSaved.map((name, index) => (
                <li className="character-list__saved" key={index}>
                  
                  <div className="block">
                    <div className="block__item block__item--full">{name}</div>
                  </div>
                  
                  <div className="block">
                    
                    <button 
                      className="btn" 
                      button="icon primary" 
                      onClick={() => CreatorUpdate(LoadCharacter(name))}
                    >
                      <span className="srt">Load character {name}</span>
                      <Icons icon="download" />
                    </button>
                    
                    {/* only show save if the character is loaded */}
                    {character.name === name &&
                    
                      <button 
                        className="btn" 
                        button="icon primary" 
                        onClick={() => CharacterSave(character.name, character)}
                      >
                        <span className="srt">Backup character {name}</span>
                        <Icons icon="save" />
                      </button>

                    }
                    
                    {/* @TODO - placeholder for other actions */}
                    <div>&nbsp;</div>
                                    
                    <button 
                      className="btn" 
                      button="icon primary" 
                      onClick={() => {
                        DeleteCharacter(name);
                        CharacterList();
                      }}
                    >
                      <span className="srt">Delete character {name}</span>
                      <Icons icon="delete" />
                    </button>
                      
                  </div>

                </li>
              ))}
            </ul>
          }
           
          <Accordion
            id="updates"
            open={true}
            accordion="updates"
            title="Change Log"
            button="full primary"
          >
            
            <p>Downloading character added (as JSON), must load character first.</p>
            
            <p>Uploading character added, still in testing.</p>
            
            <p>Some talents accounted for in stats (ATK, AC, etc), but not all - yet.</p>
            
          </Accordion>
          
          <Input 
            type="file" 
            accept=".json,application/json" 
            id="upload" 
            label="Upload" 
            minimal={true} 
            change={async (event: ChangeEvent<HTMLInputElement>) => {
              if (event.target.files) {
                const parseData = await LoadFile(event.target.files[0]);
                // @ts-ignore: defined state object vs imported, need to think on this
                characterUpdate(parseData);
              }
            }}
          />
 
        </Dialog>
        
      </nav>
      
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
                label="Alignment" 
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
                  <div className="block__item block__item--tiny" heading="5">
                    {stat}
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
                  <div className="block__item">
                    <span className="block__label">Mod</span>
                    {Modifier(Ability(stat), "0", "0")}
                  </div>
                  <div className="block__item">
                    <span className="block__label">Sav</span>
                    {Total(
                      Modifier(Ability(stat), "0", "0"),
                      SavingThrows(character.class, character.equipment),
                      "0",
                      "0",
                      "0",
                    )}
                  </div>
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
          <Section padding="creator" title="Hit Points">
            
            <div className="block">
              <div className="block__item">
                {Total(
                  Modifier(character.attributes.con, "0", "0"), 
                  character.hit_points, 
                  character.ancestry === "Dwarf" ? "2" : "0", 
                  HitPoints(character.talents_feats), 
                  HitPoints(character.equipment)
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
                max={10}
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
            
            {character.ancestry === "Human" && 
              <div className="block block__wrap">
                <div className="block__item block__item--full">
                  {AncestryBonus(AncestryData, character.ancestry)}
                </div>
                <Input  
                  type="select" 
                  id={"talent_ancestry"} 
                  label={"Additional Talent"} 
                  value={character.talents_feats.level_0}
                  change={(event: ChangeEvent<HTMLSelectElement>) => characterUpdate({
                    ...character,
                    talents_feats: {
                      ...character.talents_feats,
                      level_0: event.target.value
                    }
                    })}
                  >
                  <option value="None">-</option>
                  {ClassesData.map((role, index) => {
                    if (role.class === character.class) {
                      return(
                        <Fragment key={index}>
                          <option value={role.talents.talent_1}>{role.talents.talent_1}</option>
                          <option value={role.talents.talent_2}>{role.talents.talent_2}</option>
                          <option value={role.talents.talent_3}>{role.talents.talent_3}</option>
                          <option value={role.talents.talent_4}>{role.talents.talent_4}</option>
                          <option value={role.talents.talent_5}>{role.talents.talent_5}</option>
                        </Fragment>
                      );
                    }
                  })}
                </Input>
              </div>
            }
            
            <div className="block block__wrap">
              
              {CharacterLevel(character.level).map((index) => {
                
                const isEven = (i: number) => {
                  if (i % 2 == 0) return true;
                  else return false;
                }
                
                const Level = (i: number) => {
                  if (i == 1) return character.talents_feats.level_1;
                  else if (i == 2) return character.talents_feats.level_2;
                  else if (i == 3) return character.talents_feats.level_3;
                  else if (i == 4) return character.talents_feats.level_4;
                  else if (i == 5) return character.talents_feats.level_5;
                  else if (i == 6) return character.talents_feats.level_6;
                  else if (i == 7) return character.talents_feats.level_7;
                  else if (i == 8) return character.talents_feats.level_8;
                  else if (i == 9) return character.talents_feats.level_9;
                  else return character.talents_feats.level_10;
                }
                
                const Properties = (i: number) => {
                  if (i == 1) return "level_1";
                  else if (i == 2) return "level_2";
                  else if (i == 3) return "level_3";
                  else if (i == 4) return "level_4";
                  else if (i == 5) return "level_5";
                  else if (i == 6) return "level_6";
                  else if (i == 7) return "level_7";
                  else if (i == 8) return "level_8";
                  else if (i == 9) return "level_9";
                  else return "level_10";
                }
                
                let props = Properties(index);
                
                return(
                  <Fragment key={index}>
                    {!isEven(index) && (
                      <Input 
                        key={index} 
                        type="select" 
                        id={"talent_" + index} 
                        label={"Talent " + "(" + index + ")"} 
                        value={Level(index)}
                        change={(event: ChangeEvent<HTMLSelectElement>) => characterUpdate({
                          ...character,
                          talents_feats: {
                            ...character.talents_feats,
                            [props]: event.target.value
                          }
                        })}
                      >
                        <option value="None">-</option>
                        {ClassesData.map((role) => {
                          if (role.class === character.class) {
                            return(
                              <Fragment key={index}>
                                <option value={role.talents.talent_1}>{role.talents.talent_1}</option>
                                <option value={role.talents.talent_2}>{role.talents.talent_2}</option>
                                <option value={role.talents.talent_3}>{role.talents.talent_3}</option>
                                <option value={role.talents.talent_4}>{role.talents.talent_4}</option>
                                <option value={role.talents.talent_5}>{role.talents.talent_5}</option>
                              </Fragment>
                            );
                          }
                        })}
                      </Input>
                    )}
                    {isEven(index) && (
                      <Input 
                        key={index} 
                        type="select" 
                        id={"feat_" + index} 
                        label={"Feat " + "(" + index + ")"}
                        value={Level(index)}
                        change={(event: ChangeEvent<HTMLSelectElement>) => characterUpdate({
                          ...character,
                          talents_feats: {
                            ...character.talents_feats,
                            [props]: event.target.value
                          }
                        })}
                      >
                        <option value="None">-</option>
                        {FeatsData.sort((a, b) => a.name < b.name ? -1 : 1).map((feat, index) => {
                          return(
                            <option value={feat.name} key={index}>
                              {feat.name}
                            </option>
                          );
                        })}
                      </Input>
                    )}
                  </Fragment>
                );

              })}
            
            </div>
            
          </Section>

          {/* spells */}
          {IsCaster(character.class) &&
          
            <Section padding="creator" title="Spells">
              
              <div className="block">
                <Input 
                  type="textarea" 
                  id="spells" 
                  label="Spells" 
                  minimal={true} 
                  value={character.spells}
                  change={(event: ChangeEvent<HTMLTextAreaElement>) => characterUpdate({
                    ...character,
                    spells: event.target.value
                  })}
                />  
              </div>
              
              <div className="block">
                <div className="block__item block__item--full" heading="5">Spellcasting Check</div>
                <div className="block__item">
                  {Spellcasting(
                    character.class,
                    character.attributes,
                    character.talents_feats,
                    character.equipment
                  )}
                </div>
              </div>
              
            </Section>
          
          }
          
          {/* rituals
          <Section padding="creator" title="Rituals">
            
            <div className="block">
              <Input 
                type="select" 
                id="ritual1" 
                label="Ritual (1)" 
                value={character.rituals.ritual_0} 
                change={(event: ChangeEvent<HTMLSelectElement>) => characterUpdate({
                  ...character,
                  rituals: {
                    ...character.rituals,
                    ritual_0: event.target.value
                  }
                })}
              >
                <option value="None">-</option>
                {RitualData.map((ritual, index) => {
                  return(
                    <option value={ritual} key={index}>
                      {ritual}
                    </option>
                  );
                })}
              </Input>
              <Input 
                type="select" 
                id="ritual2" 
                label="Ritual (2)" 
                value={character.rituals.ritual_1} 
                change={(event: ChangeEvent<HTMLSelectElement>) => characterUpdate({
                  ...character,
                  rituals: {
                    ...character.rituals,
                    ritual_1: event.target.value
                  }
                })}
              >
                <option value="None">-</option>
                {RitualData.map((ritual, index) => {
                  return(
                    <option value={ritual} key={index}>
                      {ritual}
                    </option>
                  );
                })}
              </Input>
            </div>
            
          </Section>
          */}
          
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
                {ArmorData.map((armor, index) => {
                  return(
                    <option value={armor.name} key={index}>
                      {armor.name}
                    </option>
                  );
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
                {ShieldData.map((shield, index) => {
                  return(
                    <option value={shield.name} key={index}>
                      {shield.name}
                    </option>
                  );
                })}
              </Input>
            </div>
            
            {/* armor class */}
            <div className="block">
              <div className="block__item block__item--tiny" heading="5">AC</div>
              <div className="block__item">
                {ArmorClass(
                  Modifier(character.attributes.dex, "0", "0"),
                  Armors(ArmorData, character.equipment.armor, "ac"), 
                  Armors(ArmorData, character.equipment.armor, "dex"),
                  Armors(ShieldData, character.equipment.shield, "ac"),
                  character.equipment,
                  character.talents_feats
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
                  return(
                    <option value={item.name} key={index}>
                      {item.name}
                    </option>
                  );
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
              <div className="block__item block__item--tiny" heading="5">Atk</div>
              <div className="block__item">
                {Attack(
                  Modifier(character.attributes.str, "0", "0"), 
                  Modifier(character.attributes.dex, "0", "0"), 
                  WeaponData, 
                  character.equipment.hands_primary, 
                  Weapons(WeaponData, character.equipment.hands_primary, "type"), 
                  character.class, 
                  character.level,
                  character.equipment,
                  character.talents_feats
                )}
              </div>
              <div className="block__item block__item--tiny" heading="5">Dmg</div>
              <div className="block__item block__item--full">
                {Damage(
                  character.class, 
                  character.level, 
                  Weapons(WeaponData, character.equipment.hands_primary, "name"),
                  Weapons(WeaponData, character.equipment.hands_primary, "base"),
                  Weapons(WeaponData, character.equipment.hands_primary, "damage"),
                  character.equipment
                )}
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
                  return(
                    <option value={item.name} key={index}>
                      {item.name}
                    </option>
                  );
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
              <div className="block__item block__item--tiny" heading="5">Atk</div>
              <div className="block__item">
                {Attack(
                  Modifier(character.attributes.str, "0", "0"), 
                  Modifier(character.attributes.dex, "0", "0"), 
                  WeaponData, 
                  character.equipment.hands_secondary, 
                  Weapons(WeaponData, character.equipment.hands_secondary, "type"), 
                  character.class, 
                  character.level,
                  character.equipment,
                  character.talents_feats
                )}
              </div>
              <div className="block__item block__item--tiny" heading="5">Dmg</div>
              <div className="block__item block__item--full">
                {Damage(
                  character.class, 
                  character.level, 
                  Weapons(WeaponData, character.equipment.hands_secondary, "name"),
                  Weapons(WeaponData, character.equipment.hands_secondary, "base"),
                  Weapons(WeaponData, character.equipment.hands_secondary, "damage"),
                  character.equipment
                )}
              </div>
            </div>
            
          </Section>

          {/* equipment */}
          <Section padding="creator" title="Equipment">

            <div className="block block__wrap">
              
              {EquipmentData.map((item, index) => {

                function Match(prop: string) {
                  if (prop == "head") return character.equipment.head;
                  else if (prop == "back") return character.equipment.back;
                  else if (prop == "neck") return character.equipment.neck;
                  else if (prop == "arms") return character.equipment.arms;
                  else if (prop == "waist") return character.equipment.waist;
                  else if (prop == "feet") return character.equipment.feet;
                  else if (prop == "accessory") return character.equipment.accessory;
                  else if (prop == "misc") return character.equipment.misc;
                  else return "error";
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
                );

              })}
            
            </div>
            
          </Section>
          
          {/* inventory */}
          <Section padding="creator" title="Inventory">
            
            <div className="block">

              <div className="block__item" heading="5">LT</div>
              <Input 
                type="number" 
                id="luck_tokens"
                label="LT" 
                minimal={true} 
                value={character.luck_tokens} 
                change={(event: ChangeEvent<HTMLInputElement>) => characterUpdate({
                  ...character,
                  luck_tokens: event.target.value
                })}
              />

              <div className="block__item" heading="5">GP</div>
              <Input 
                type="number" 
                id="money_gp"
                label="GP" 
                minimal={true} 
                value={character.money.gp} 
                change={(event: ChangeEvent<HTMLInputElement>) => characterUpdate({
                  ...character,
                  money: {
                    ...character.money,
                    gp: event.target.value
                  }
                })}
              />
              
              <div className="block__item" heading="5">SP</div>
              <Input 
                type="number" 
                id="money_sp"
                label="SP" 
                minimal={true} 
                value={character.money.sp} 
                change={(event: ChangeEvent<HTMLInputElement>) => characterUpdate({
                  ...character,
                  money: {
                    ...character.money,
                    sp: event.target.value
                  }
                })}
              />
              
              <div className="block__item" heading="5">CP</div>
              <Input 
                type="number" 
                id="money_cp"
                label="CP" 
                minimal={true} 
                value={character.money.cp} 
                change={(event: ChangeEvent<HTMLInputElement>) => characterUpdate({
                  ...character,
                  money: {
                    ...character.money,
                    cp: event.target.value
                  }
                })}
              />
            </div>
            
            <div className="block">
              <Input 
                type="textarea" 
                id="inventory" 
                label="Inventory" 
                minimal={true} 
                value={character.inventory}
                change={(event: ChangeEvent<HTMLTextAreaElement>) => characterUpdate({
                  ...character,
                  inventory: event.target.value
                })}
              />  
            </div>

          </Section>
          
          {/* Notes */}
          <Section padding="creator" title="Notes">
            
            <div className="block">
              <Input 
                type="textarea" 
                id="notes" 
                label="Notes" 
                minimal={true} 
                value={character.notes}
                change={(event: ChangeEvent<HTMLTextAreaElement>) => characterUpdate({
                  ...character,
                  notes: event.target.value
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