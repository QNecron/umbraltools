// character
export const ArmorClass = (
  modifier: number, 
  armor: any, 
  dex: any, 
  shield: any, 
  items: any,
  misc: any
) => {

  let ac = 0;
  
  if (!armor) armor = 10;
  
  if (!dex) modifier = 0;
    
  ac =+ modifier + armor + shield + items + misc;
    
  return ac;
  
}

// items
export const Weapons = (data: {}[], item: string, returned: string) => {
  let type = "-";
  let range = "-";
  let damage = "-";
  let properties = "-";

  data.map((weapon: any) => {
    if (weapon.name === item) type = weapon.type
    if (weapon.name === item) range = weapon.range
    if (weapon.name === item) damage = weapon.damage
    if (weapon.name === item) properties = weapon.properties
  });
  
  if (returned == "type") return type;
  if (returned == "range") return range;
  if (returned == "damage") return damage;
  if (returned == "properties") return properties;
  
}

export const Armors = (data: {}[], item: string, returned: string) => {
  let ac = 0;
  let dex = true;
  let bonus = 0;
  let properties = "-";
  
  data.map((armor: any) => {
    if (armor.name === item) ac = armor.ac
    if (armor.name === item) dex = armor.dex
    if (armor.name === item) bonus = armor.bonus
    if (armor.name === item) properties = armor.properties
  });

  if (returned == "ac") return ac + bonus;
  if (returned == "dex") return dex;
  if (returned == "properties") return properties;
  
}