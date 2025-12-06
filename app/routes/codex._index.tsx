import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import Hero from "../components/hero";
import Section from "../components/section";
import Wrapper from "../components/wrapper";
import Accordion from "../components/accordion";

import Desktop from "../images/hero_desktop_16-4-5.webp";
import Mobile from "../images/hero_mobile_1-1.webp";

export const meta: MetaFunction = () => {
  return [
    { title: "Codex | Umbral Tools" },
    { name: "description", content: "Changes for all Umbral Tools games." },
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
      title="Codex" 
      logo={false} 
    />

    <Section>
      <Wrapper>
        
        <Accordion
          id="changes"
          open={true}
          accordion="codex"
          title="Changes"
          button="full primary"
        >
        
          <p>Changes to core classes:</p>
                
          <ul>
            <li>Priest: Choose between <strong>Turn Undead</strong> or <strong>Command Undead</strong> at level 1.</li>
            <li>Priest: Add <strong>crossbows</strong> to weapons you're proficient in.</li>
            <li>Thief: <strong>Backstab</strong> works on flanked enemies.</li>
            <li>Wizard: Add <strong>crossbows</strong> to weapons you're proficient in.</li>
          </ul>
                
          <p>Changes to core items:</p>
                
          <ul>
            <li>Arrows: Are now interchangable with Bolts.</li>
            <li>Bolts: Are now interchangable with Arrows.</li>
          </ul>
                
          <p>Changes to core spells:</p>
                
          <ul>
            <li>Bless: Now grants +1 to attack and spellcasting checks for 3 rounds.</li>
            <li>Smite: Now deals 2d6 damage, up from 1d6.</li>
            <li>Flamestrike: Now deals 3d6 damage, up from 2d6.</li>
            <li>New: Additional Priest and Wizard <Link className="link" reloadDocument to="/spells">Spells</Link>.</li>
          </ul>
          
        </Accordion>
        
        <Accordion 
          id="classes"
          open={true}
          accordion="codex"
          title="Classes"
          button="full primary"
        >
                
          <p>The following classes are available to choose from for ShadowDark campaigns:</p>
                  
          <ul>
            <li>Fighter</li>
            <li>Priest</li>
            <li>Thief</li>
            <li>Wizard</li>
            <li>Bard</li>
            <li>Ranger</li>
            <li>Cursed Knight <strong>[Knight of St. Ydris]</strong></li>
            <li>Warlock</li>
            <li>Witch</li>
            <li><Link className="link" reloadDocument to="/codex/cipher">Cipher</Link> <strong>[Umbral Tools]</strong></li>
          </ul>
                
        </Accordion>

        <Accordion 
          id="leveing"
          open={false}
          accordion="codex"
          title="Leveling"
          button="full primary"
        >

          <p>Leveling will follow the ShadowDark ruleset except for the following:</p>
                
          <ul>
            <li>At first level players will recieve the maximum hit points possible.</li>
            <li>On even levels players gain a <Link className="link" reloadDocument to="/feats">Feat</Link>.</li>
          </ul>
                
        </Accordion>
        
        <Accordion 
          id="inventory"
          open={false}
          accordion="codex"
          title="Inventory Slots"
          button="full primary"
        >
          
          <p>In addition to the 10 starting inventory slots players will also have:</p>

          <ul>
            <li><strong>[Head]</strong> Circlets, Headbands, Helmets, Hoods, and Masks</li>
            <li><strong>[Back]</strong> Capes, Cloaks, and Mantles</li>
            <li><strong>[Neck]</strong> Amulets, Broaches, and Necklaces</li>
            <li><strong>[Body]</strong> Armor and Robes</li>
            <li><strong>[Arms]</strong> Gauntlets, Gloves, and Vambraces</li>
            <li><strong>[Hands]</strong> Weapons and Shields</li>
            <li><strong>[Accessories]</strong> Bangles, Bracelets, and Rings</li>
            <li><strong>[Waist]</strong> Belts and Sashes</li>
            <li><strong>[Feet]</strong> Boots, Sandles, and Sabatons</li>
            <li><strong>[Misc]</strong> Ioun Stones</li>
          </ul>
                
        </Accordion>
        
        <Accordion 
          id="actions"
          open={false}
          accordion="codex"
          title="Actions"
          button="full primary"
        >

          <p>Clarification on actions a player could choose to do on their turn:</p>
                
          <ul>
            <li>Knowledge checks are a free action within reason.</li>
            <li>Perception; seeing, hearing, and smelling, checks are a free action within reason.</li>
            <li>Swapping weapons is a free action.</li>
          </ul>
                
          <p>What attribute is an action tied to, examples:</p>

          <ul>
            <li><strong>[STR]</strong> Climb, Jump, Pull, Push</li>
            <li><strong>[DEX]</strong> Acrobatics, Balance, Jump</li>
            <li><strong>[CON]</strong> Hold Breath, Tolerate Pain</li>
            <li><strong>[WIS]</strong> Heal, Intuition, Perception</li>
            <li><strong>[INT]</strong> Knowledge (All), Recollection</li>
            <li><strong>[CHR]</strong> Intimidate, Persuade</li>
          </ul>
          
        </Accordion>

        <Accordion 
          id="damage"
          open={false}
          accordion="codex"
          title="Damage Types"
          button="full primary"
        >
                
          <p>Damage types defined:</p>
                
          <ul>
            <li><strong>[Physical]</strong> Bludgeoning, Piercing, and Slashing</li>
            <li><strong>[Elemental]</strong> Acid, Cold, Electricity, and Fire</li>
            <li><strong>[Foundational]</strong> Force, Light, and Shadow</li>
          </ul>
                
        </Accordion>
        
      </Wrapper>
    </Section>
    
    </>
  );
  
}
