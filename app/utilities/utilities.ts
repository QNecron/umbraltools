// character
export const Modifier = (a: string, b: string, c: string) => {
  const add = parseInt(a) + parseInt(b) + parseInt(c);
  const total = Math.floor((add - 10) / 2);
  let modifier;

  if (total >= 0) modifier = "+" + total.toString();
  else if (total <= -1) modifier = total.toString();

  return modifier;
}

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
export const Total = (a: string, b: string, c: string, d: string) => {
  let one = parseInt(a) ? parseInt(a) : 0;
  let two = parseInt(b) ? parseInt(b) : 0;
  let three = parseInt(c) ? parseInt(c) : 0;
  let four = parseInt(d) ? parseInt(d) : 0;
  const add = one + two + three + four;

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