export const Weapons = (data: {}[], item: string) => {
  let damage = "";

  data.map((weapon: any) => {
    if (weapon.name === item) damage = weapon.damage
  });
  
  return damage;
}