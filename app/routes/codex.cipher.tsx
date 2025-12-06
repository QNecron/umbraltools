import type { MetaFunction } from "@remix-run/node";

import Hero from "../components/hero";
import Section from "../components/section";
import Wrapper from "../components/wrapper";
import Grid from "../components/grid";

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
    />
    
    <Section padding="top">
      <Wrapper>
        
        <Grid desktop={2} tablet={2} mobile={1}>
          
          <div className="page">
            
            <p>Ciphers are uncommon and often misunderstood individuals with 
            extraordinary mental abilities. Like priests and wizards they're 
            able to cast devastating spells, however, ciphers manifest spells 
            through mental prowess alone.</p>
            
            <p><strong>Weapons:</strong> Club, Crossbow, Dagger, Mace, Shortsword, Shortbow, Spear</p>
            
            <p><strong>Armor:</strong> Leather armor and shields</p>
            
            <p><strong>Hit Points:</strong> 1d4 per level</p>
            
            <p><strong>Languages:</strong> You have telepathy (near)</p>
            
          </div>
          
          <div className="page">
            
            <p><strong>Psionics.</strong> You cast cipher spells you know by 
            expending focus points. The level of the spell is how many focus 
            points are needed in order to cast.</p>

            <p>To cast a cipher spell you know, make a spellcasting check by rolling 
            1d20 + your Charisma modifier. The DC to successfully cast a spell is 
            10 + the spell's tier in addition to having the appropriate focus points 
            to expend.</p>

            <p>You know two tier 1 spells of your choice from the cipher spell list 
            as well as the Telekinesis spell (cipher only version).</p>

            <p>Each time you gain a level, you choose new cipher spells to learn 
            according to the Cipher Spells Known table below.</p>
            
            <p><strong>Psychic Leech.</strong> Your attacks generate focus, hitting 
            or afflicting an enemy generates 1 focus point. You begin combat with half 
            your level (minimum of 1) focus points. You receive a bonus to melee and 
            ranged attack rolls equal to half your level (minimum of 1).</p>
            
          </div>
          
        </Grid>
        
        <Grid desktop={2} tablet={2} mobile={1}>
          
          <div className="page">
            <table className="table">
              <thead>
                <tr>
                  <th className="table__header">Roll</th>
                  <th>Trait</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>2</th>
                  <td>Gain advantage on casting one spell you know</td>
                </tr>
                <tr>
                  <th>3-6</th>
                  <td>+1 focus at the beginning of combat and +1 hit point</td>
                </tr>
                <tr>
                  <th>7-9</th>
                  <td>+2 to Strength, Dexterity, or Charisma stat</td>
                </tr>
                <tr>
                  <th>10-11</th>
                  <td>+1 to cipher spellcasting checks</td>
                </tr>
                <tr>
                  <th>12</th>
                  <td>Choose a talent or +2 points to distribute to stats</td>
                </tr>
              </tbody>
            </table>
          </div>
            
          <div className="page">
            <table className="table">
              <thead>
                <tr>
                  <th colSpan={6}>Spells Known</th>
                </tr>
                <tr>
                  <th>Level</th>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>2</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>3</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>3</td>
                  <td>1</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th>4</th>
                  <td>3</td>
                  <td>2</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th>5</th>
                  <td>3</td>
                  <td>2</td>
                  <td>1</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th>6</th>
                  <td>3</td>
                  <td>2</td>
                  <td>2</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th>7</th>
                  <td>3</td>
                  <td>3</td>
                  <td>2</td>
                  <td>1</td>
                  <td></td>
                </tr>
                <tr>
                  <th>8</th>
                  <td>3</td>
                  <td>3</td>
                  <td>2</td>
                  <td>2</td>
                </tr>
                <tr>
                  <th>9</th>
                  <td>3</td>
                  <td>3</td>
                  <td>2</td>
                  <td>2</td>
                  <td>1</td>
                </tr>
                <tr>
                  <th>10</th>
                  <td>3</td>
                  <td>3</td>
                  <td>3</td>
                  <td>2</td>
                  <td>2</td>
                </tr>            
              </tbody>
            </table>
          </div>
          
        </Grid>
        
      </Wrapper>
    </Section>
    
    </>
  );
  
}
