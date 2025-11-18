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

export const Modifier = (a: string, b?: string, c?: string) => {
  let one = a ? parseInt(a) : 0;
  let two = b ? parseInt(b) : 0;
  let three = c ? parseInt(c) : 0;
  
  const add = one + two + three;
  const attribute = Math.floor((add - 10) / 2);

  return attribute.toString();
}

export const ArmorClass = (
  modifier: string, 
  armor: string, 
  dex: string, 
  shield: string, 
  items?: {},
  talents?: {},
  temporary?: string
) => {
  let bonus = 0;
  let ac = 0;
  let mod = 0;
  let temp = temporary ? temporary : "0";
  
  if (armor === "0") ac = 10;
  
  if (dex === "true") mod += parseInt(modifier);
  
  
  
  // @TODO - not sure I like this..
  if (items) {
    Object.entries(items).map(([key, value]) => (
      value === "Steadfast" ? bonus += 1 : 0,
      value === "The Spine of Thicket Green" ? bonus += 1 : 0,
      value === "Pilgrims Lasting Vigil" ? bonus += 1 : 0,
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
  
  ac += parseInt(armor) + parseInt(shield) + mod + bonus + parseInt(temp);
    
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
  weapon_properties: string,
  role: string, 
  level: string,
  items?: {},
  talents?: {},
  temporary?: string
) => {
  let bonus = 0;
  let posneg = "+";
  let attribute = str;
  let profession = 0;
  let temp = temporary ? temporary : "0";
  
  if (
    weapon_type === "R" || 
    weapon_properties === "F, Th" || 
    weapon_properties === "F") attribute = dex;
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
      value === "Pilgrims Lasting Vigil" ? bonus += 1 : 0,
      value === "Ioun Stone, Garnet" ? bonus += 1 : 0
    ));
  }
  
  if (talents) {
    Object.entries(talents).map(([key, value]) => (
      value === "+1 to melee and ranged attacks" ? bonus += 1 : 0
    ));
  }
  
  bonus += parseInt(attribute) + profession + parseInt(temp);
  
  if (bonus < 0) posneg = "";
  
  return posneg + bonus.toString();
  
}

export const Damage = ( 
  role: string, 
  level: string, 
  weaponName: string, 
  weaponBase: string, 
  weaponDamage: string,
  data: {},
  temporary?: string
) => {
  
  let damageTotal = weaponDamage;
  let damageBonus = "";
  let isRanged = false;
  let profession = 0;
  let temp = temporary ? temporary : "0";
      
  if (role === "Fighter") {
    profession = Math.floor(((parseInt(level) + 1) / 2));
    damageBonus += " + " + profession.toString();
  }
  
  if (
    weaponBase === "Crossbow" ||
    weaponBase === "Longbow" ||
    weaponBase === "Shortbow"     
  ) isRanged = true;
  else {
    // weapon not found
  }
  
  Object.entries(data).map(([key, value]) => (
    value === "Executioner's Hood" ? damageBonus += " + 1" : "",
    value === "One Dozen Stood" && isRanged === false ? damageBonus += " + 1d4 (Fire)" : "",
    value === "Scâth Gwannek" && isRanged === false ? damageBonus += " + 1d4 (Cold)" : "",
    value === "Boltcatchers" ? damageBonus += " + 1d4 (Electrical)" : "",
    value === "Corroded Vambraces" && isRanged === false ? damageBonus += " + 1 (Acid)" : "",
    value === "Forgemaster's Gloves" && isRanged === false ? damageBonus += " + 1 (Fire)" : "",
    value === "Ring of Frigid Claim" ? damageBonus += " + 1 (Cold)" : "",
    value === "Ring of Searing Flames" ? damageBonus += " + 1 (Fire)" : "",
    value === "Berserker's Belt" && isRanged === false ? damageBonus += " + 2" : "",
    value === "Mantle of Wreathing Flame" ? damageBonus += " + 1d4 (Fire)" : "",
    value === "Cloak of Minor Missiles" && isRanged === true ? damageBonus += " + 1" : "",
    value === "Ioun Stone, Amber" ? damageBonus += " + 1" : "" 
  ));
  
  if (temp !== "0") damageBonus += " + " + parseInt(temp);
  
  return damageTotal + damageBonus;
  
}

export const HitPoints = (data: {}) => {
  let bonus = 0;
  
  // @TODO - not sure I like this..
  Object.entries(data).map(([key, value]) => (
    value === "Toughness" ? bonus += 3 : 0,
    value === "Wyrmwull" ? bonus += 3 : 0,
    value === "Warding Staff" ? bonus += 3 : 0,
    value === "Cloak of Comfort" ? bonus += 3 : 0,
    value === "Ring of Toughness" ? bonus += 3 : 0,
    value === "Ioun Stone, Alexandrite" ? bonus += 3 : 0,
    value === "Amulet of Vitality" ? bonus += 3 : 0,
    value === "+1 focus at the beginning of combat and +1 hit point" ? bonus += 1 : 0
  ));
  
  return bonus.toString();
  
}

export const Augmentations = (data: {}, augs: {}, bonus: string) => { 
  console.log(data);
  console.log(augs);
  console.log(bonus);
  return "0";
}

export const SavingThrows = (role: string, items: {}) => {
  let bonus = 0;
  
  // @TODO - not sure I like this..
  Object.entries(items).map(([key, value]) => (
    value === "Outworn Shield" && role === "Priest" ? bonus += 1 : 0,
    value === "Outworn Shield" && role === "Ranger" ? bonus += 1 : 0,
    value === "Cloak of Protection" ? bonus += 1 : 0,
    value === "Ring of Protection" ? bonus += 1 : 0,
    value === "Tempered Helm" ? bonus += 1 : 0
  ));
  
  return bonus.toString();
  
}

export const Spellcasting = (
  role: string, 
  attributes: any, 
  talents: {}, 
  items: {},
  temporary?: any,
) => {
  let attribute = 10;
  let bonus = 0;
  let modifier = "0";
  let total = 0;
  let tempAttribute = "0";
  let tempSpellcheck = temporary.spellcheck ? temporary.spellcheck : "0";
  
  if (role === "Priest") { 
    attribute = attributes.wis;
    tempAttribute = temporary.wis;
  }
  else if (role === "Wizard") {
    attribute = attributes.int;
    tempAttribute = temporary.int;
  }
  else { 
    attribute = attributes.chr;
    tempAttribute = temporary.chr;
  }
  
  Object.entries(talents).map(([key, value]) => (
    value === "+1 to priest spellcasting checks" ? bonus += 1 : 0,
    value === "+2 to Intelligence stat or +1 to wizard spellcasting checks" && attribute >= 18 ? bonus += 1 : 0,
    value === "+2 to Charisma stat or +1 to witch spellcasting checks" && attribute >= 18 ? bonus += 1 : 0,
    value === "+1 to cipher spellcasting checks" ? bonus += 1 : 0,
    value === "Combat Casting" ? bonus += 1 : 0
  ));
  
  Object.entries(items).map(([key, value]) => (
    value === "Cabalist's Gambeson" ? bonus += 1 : 0,
    value === "High Harbinger's Robes" ? bonus += 1 : 0,
    value === "Ioun Stone, Iolite" ? bonus += 1 : 0
  ));
  
  modifier = Modifier(attribute.toString(), tempAttribute.toString());
  
  total = parseInt(modifier) + bonus + parseInt(tempSpellcheck);
  
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
export const Total = (a: string, b: string, c?: string, d?: string, e?: string, f?: string) => {
  let one = a ? parseInt(a) : 0;
  let two = b ? parseInt(b) : 0;
  let three = c ? parseInt(c) : 0;
  let four = d ? parseInt(d) : 0;
  let five = e ? parseInt(e) : 0;
  let six = f ? parseInt(f) : 0;
  const add = one + two + three + four + five + six;

  return add.toString();
}

// items
export const Weapons = (data: {}[], item: string, returned: string) => {
  let base = "-";
  let type = "-";
  let range = "-";
  let damage = "-";
  let properties = "-";
  let final = "-";

  data.map((weapon: any) => {
    
    if (item === weapon.name) {
      base = weapon.base;
      type = weapon.type;
      range = weapon.range;
      damage = weapon.damage;
      properties = weapon.properties;
    }

  });

  if (returned == "base") final = base;
  if (returned == "type") final = type;
  if (returned == "range") final = range;
  if (returned == "damage") final = damage;
  if (returned == "properties") final = properties;
  
  return final;
  
}

export const Armors = (data: {}[], item: string, returned: string) => {
  let ac = 0;
  let dex = true;
  let bonus = 0;
  let properties = "-";
  let final = "-";
  
  data.map((armor: any) => {
    
    if (item === armor.name) { 
      ac = armor.ac;
      dex = armor.dex;
      bonus = armor.bonus;
      properties = armor.properties;
    }
    
  });
  
  if (returned == "ac") final = (ac + bonus).toString();
  if (returned == "dex") final = dex.toString();
  if (returned == "properties") final = properties;
  
  return final;
  
}

export const ItemInformation = (data: {}[], equipped: string, info: string) => {
  
  let base = "";
  let description = "";
  let benefit = "";
  let additional = "";
  
  data.map((item: any) => {
    if (item.name === equipped) {
      base = "+" + item.bonus + " " + item.base;
      description = item.description;
      benefit = item.benefit;
      additional = item.additional;
    }
  });
  
  if (info === "base") {
    return base;
  }
  else if (info === "description") {
    return description;
  }
  else if (info === "benefit") {
    return benefit;
  }
  else {
    return additional;
  }
  
}

// load file
export const LoadFile = (file: Blob) => new Promise((resolve, reject) => {

  const fileReader = new FileReader();

  fileReader.onload = event => {
    if (event.target) {
      resolve(JSON.parse(event.target.result as string));
    }
  }

  fileReader.onerror = error => reject(error);
  fileReader.readAsText(file);
  
});
