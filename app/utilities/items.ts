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