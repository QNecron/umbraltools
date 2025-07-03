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
  items?: {},
  talents?: {}
) => {
  let bonus = 0;
  let ac = 0;
  let mod = 0;
  
  if (armor === "0") ac = 10;
  
  if (dex === "true") mod += parseInt(modifier);
  
  // @TODO - not sure I like this..
  if (items) {
    Object.entries(items).map(([key, value]) => (
      value === "Steadfast" ? bonus += 1 : 0,
      value === "The Spine of Thicket Green" ? bonus += 1 : 0,
      value === "Cape of Withdrawl" ? bonus += 1 : 0,
      value === "Ioun Stone, Peridot" ? bonus += 1 : 0,
      value === "Cloak of Protection" ? bonus += 1 : 0,
      value === "Ring of Protection" ? bonus += 1 : 0
    ));
  }
  
  if (talents) {
    Object.entries(talents).map(([key, value]) => (
      value === "Choose one kind of armor. You get +1 AC from that armor" ? bonus += 1 : 0
    ));
  }
  
  ac += parseInt(armor) + parseInt(shield) + mod + bonus;
    
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
  weapons: {}[], 
  weapon_name: string,
  weapon_type: string, 
  role: string, 
  level: string,
  items?: {},
  talents?: {}
) => {
  let bonus = 0;
  let posneg = "+";
  let attribute = str;
  let profession = 0;
  
  if (weapon_type === "R") attribute = dex;
  else if (weapon_type === "M/R") attribute = dex > str ? dex : str;
  else attribute = str;
  
  if (role === "Fighter") profession = Math.floor(((parseInt(level) + 1) / 2));
  
  if (role === "Cipher") profession = Math.floor(((parseInt(level) + 1) / 2));

  weapons.map((weapon: any) => {
    if (weapon.name === weapon_name) bonus += weapon.bonus;
  });
  
  // @TODO - not sure I like this..
  if (items) {
    Object.entries(items).map(([key, value]) => (
      value === "Prey Maker" ? bonus += 2 : 0,
      value === "Stag Helm" ? bonus += 1 : 0,
      value === "Ioun Stone, Garnet" ? bonus += 1 : 0
    ));
  }
  
  if (talents) {
    Object.entries(talents).map(([key, value]) => (
      value === "+1 to melee and ranged attacks" ? bonus += 1 : 0
    ));
  }
  
  bonus += parseInt(attribute) + profession;
  
  if (bonus < 0) posneg = "";
  
  return posneg + bonus.toString();
  
}

export const Damage = ( 
  role: string, 
  level: string, 
  weaponName: string, 
  weaponBase: string, 
  weaponDamage: string,
  data: {}
) => {

  let damageTotal = weaponDamage;
  let damageBonus = "";
  let isRanged = false;
  let profession = 0;
  
  if (role === "Fighter") {
    profession = Math.floor(((parseInt(level) + 1) / 2));
    damageBonus += " + " + profession.toString();
  }
  
  if (
    weaponName === "Crossbow" || 
    weaponName === "Longbow" ||
    weaponName === "Shortbow"  
  ) isRanged = true;
  else if (
    weaponBase === "Crossbow" ||
    weaponBase === "Longbow" ||
    weaponBase === "Shortbow"     
  ) isRanged = true;
  else {
    // weapon not found
  }
  
  Object.entries(data).map(([key, value]) => (
    value === "Executioner's Hood" ? damageBonus += " + 1" : "",
    value === "Boltcatchers" ? damageBonus += " + 1d4 (Electrical)" : "",
    value === "Corroded Vambraces" && isRanged === false ? damageBonus += " + 1 (Acid)" : "",
    value === "Berserker's Belt" && isRanged === false ? damageBonus += " + 2" : "",
    value === "Mantle of Wreathing Flame" ? damageBonus += " + 1d4 (Fire)" : "",
    value === "Cloak of Minor Missiles" && isRanged === true ? damageBonus += " + 1" : "",
    value === "Ioun Stone, Amber" ? damageBonus += " + 1" : "" 
  ));
  
  return damageTotal + damageBonus;
  
}

export const HitPoints = (data: {}) => {
  let bonus = 0;
  
  // @TODO - not sure I like this..
  Object.entries(data).map(([key, value]) => (
    value === "Toughness" ? bonus += 3 : 0,
    value === "Wyrmwull" ? bonus += 3 : 0,
    value === "Warding Staff" ? bonus += 3 : 0,
    value === "Ring of Toughness" ? bonus += 3 : 0,
    value === "Ioun Stone, Alexandrite" ? bonus += 3 : 0,
    value === "Amulet of Vitality" ? bonus += 3 : 0,
    value === "+1 focus at the beginning of combat and +1 hit point" ? bonus += 1 : 0
  ));
  
  return bonus.toString();
  
}

export const Spellcasting = (
  role: string, 
  attributes: any, 
  talents: {}, 
  items: {}
) => {
  let attribute = 10;
  let bonus = 0;
  let modifier = "0";
  let total = 0;
  
  if (role === "Priest") attribute = attributes.wis;
  if (role === "Wizard") attribute = attributes.int;
  if (role === "Cursed Knight") attribute = attributes.chr;
  if (role === "Witch") attribute = attributes.chr;
  if (role === "Cipher") attribute = attributes.chr;
  
  Object.entries(talents).map(([key, value]) => (
    value === "+1 to priest spellcasting checks" ? bonus += 1 : 0,
    value === "+2 to Intelligence stat or +1 to wizard spellcasting checks" && attribute >= 18 ? bonus += 1 : 0,
    value === "+2 to Charisma stat or +1 to witch spellcasting checks" && attribute >= 18 ? bonus += 1 : 0,
    value === "+1 to cipher spellcasting checks" ? bonus += 1 : 0,
    value === "Combat Casting" ? bonus += 1 : 0
  ));
  
  Object.entries(items).map(([key, value]) => (
    value === "High Harbinger's Robes" ? bonus += 1 : 0,
    value === "Ioun Stone, Iolite" ? bonus += 1 : 0
  ));
  
  modifier = Modifier(attribute.toString(), "0", "0");
  
  total = parseInt(modifier) + bonus;
  
  return "+" + total.toString();
}

export const IsCaster = (role: string) => {
  let caster = false;
  
  if (role === "Priest") caster = true;
  if (role === "Wizard") caster = true;
  if (role === "Cursed Knight") caster = true;
  if (role === "Witch") caster = true;
  if (role === "Cipher") caster = true;
  
  return caster;
  
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