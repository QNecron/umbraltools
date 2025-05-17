// save + load
export const SaveCharacter = (data: any, name: string) => {
  let hero = name;

  if (!hero) return

  const saved = JSON.stringify(data);
  const storage = window.localStorage;

  storage.setItem(name, saved);

}

export const LoadCharacter = (name: string) => {
  let data = [];  
  const storage = window.localStorage;
  const saved = storage.getItem(name);
  
  if (saved) {
    data = JSON.parse(saved);
    return data;
  }
  else {
    console.log("No saved character data found.")
  }
  
}

export const DeleteCharacter = (name: string) => {
  const storage = window.localStorage

  if (!name) {
    console.log("No saved character data found.");
    return;
  }
  
  storage.removeItem(name);

}

// character
export const AncestryBonus = (data: {}[], ancestry: string) => {
  let bonus = "-";
  
  data.map((race: any) => {
    if (race.ancestry === ancestry) bonus = race.trait.name;
  });

  return bonus;

}

export const Modifier = (a: string, b: string, c: string) => {
  const add = parseInt(a) + parseInt(b) + parseInt(c);
  const attribute = Math.floor((add - 10) / 2);

  return attribute.toString();
}

export const ArmorClass = (
  modifier: string, 
  armor: string, 
  dex: string, 
  shield: string, 
  items: number,
  misc: number
) => {
  let ac = 0;
  let mod = 0;
  
  if (armor === "0") ac = 10;
  
  if (dex === "true") mod += parseInt(modifier);
    
  ac += parseInt(armor) + parseInt(shield) + mod + items + misc;
    
  return ac;
  
}

export const HitDie = (role: string) => {
  let die = "d4";
  
  switch (role) {
    
    case "Fighter":
    case "Ranger":
      die = "d8";
    break;
    
    case "Priest":
    case "Bard":
    case "Cursed Knight":
    case "Warlock":
      die = "d6";
    break;
    
    default: die = "d4";
    
  }

  return die;
  
}

export const Attack = (
  str: string, 
  dex: string, 
  data: {}[], 
  name: string,
  type: string, 
  role: string, 
  level: string
) => {
  let bonus = 0;
  let posneg = "+";
  let attribute = str;
  let fighter = 0;
  
  if (type === "R") attribute = dex;
  else if (type === "M/R") attribute = dex > str ? dex : str;
  else attribute = str;
  

  if (role === "Fighter") fighter = Math.floor(((parseInt(level) + 1) / 2));

  data.map((weapon: any) => {
    if (weapon.name === name) bonus += weapon.bonus;
  });
  
  bonus += parseInt(attribute) + fighter;
  
  if (bonus < 0) posneg = "";
  
  return posneg + bonus.toString();
  
}

export const HitPoints = (data: {}) => {
  let bonus = 0;
  
  // @TODO - not sure I liked this..
  Object.entries(data).map(([key, value]) => (
    value === "Toughness" ? bonus += 4 : 0,
    value === "Ring of Toughness" ? bonus += 4: 0
  ));
  
  return bonus.toString();
  
}

// dice
export const DiceRoll = (dice: string, count: number) => {
  let die = 0;
  let roll = 0;

  if (count === 0) return 0;

  if (dice === "d100") { die = 100; }
  else if (dice === "d20") { die = 20; }
  else if (dice === "d12") { die = 12; }
  else if (dice === "d10") { die = 10; }
  else if (dice === "d8") { die = 8; }
  else if (dice === "d6") { die = 6; }
  else if (dice === "d4") { die = 4; }
  else if (dice === "d3") { die = 3; }
  else if (dice === "d2") { die = 2; }
  else {
    console.log("No dice defined.");
  }

  while (count >=1) {
    roll += 1 + Math.floor(Math.random() * Math.floor(die));
    count--;
  }

  return roll;

}

// generic
export const Total = (a: string, b: string, c: string, d: string, e?: any) => {
  let one = parseInt(a) ? parseInt(a) : 0;
  let two = parseInt(b) ? parseInt(b) : 0;
  let three = parseInt(c) ? parseInt(c) : 0;
  let four = parseInt(d) ? parseInt(d) : 0;
  let five = parseInt(e) ? parseInt(e) : 0;
  const add = one + two + three + four + five;

  return add.toString();
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
  else if (returned == "range") return range;
  else if (returned == "damage") return damage;
  else if (returned == "properties") return properties;
  else return "error";
  
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

  if (returned == "ac") return (ac + bonus).toString();
  else if (returned == "dex") return dex.toString();
  else if (returned == "properties") return properties;
  else return "error";
  
}