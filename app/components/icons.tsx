interface propsIcons {
  icon: string;
  height?: number;
  width?: number;
}

import Logo from "../images/d20.png";
import Close from "../images/close.svg";

export default function Icons({icon, height, width}: propsIcons) {

  const iconType = (type: string) => {
    
    let url = "error";
    
    if (type === "logo") url = Logo;
    if (type === "close") url = Close;
    
    return url;
    
  }
  
  return(
    <img 
      src={iconType(icon)} 
      className={`icon ` + icon} 
      height={height || 40} 
      width={width || 40} 
      alt=" " 
      aria-hidden="true" />
  );
  
};