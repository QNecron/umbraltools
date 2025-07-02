import Logo from "../images/d20.png";
import Clipboard from "../images/clipboard.svg";
import Close from "../images/close.svg";
import Copy from "../images/copy.svg";
import Dice from "../images/dice.svg";
import Download from "../images/cloud-download.svg";
import Upload from "../images/cloud-upload.svg";
import Flame from "../images/flame.svg";
import Save from "../images/save.svg";
import Delete from "../images/skull.svg";
import Search from "../images/search.svg";
import Reader from "../images/reader.svg";

interface propsIcons {
  icon: string;
  height?: number;
  width?: number;
}

export default function Icons({icon, height, width}: propsIcons) {

  const iconType = (type: string) => {
    
    let url = "error";
    
    if (icon === "logo") url = Logo;
    if (icon === "clipboard") url = Clipboard
    if (icon === "close") url = Close
    if (icon === "copy") url = Copy
    if (icon === "dice") url = Dice
    if (icon === "download") url = Download
    if (icon === "upload") url = Upload
    if (icon === "delete") url = Delete
    if (icon === "search") url = Search
    if (icon === "flame") url = Flame
    if (icon === "reader") url = Reader
    if (icon === "save") url = Save
    
    return url;
    
  }
  
  return(
    <img 
      src={iconType(icon)} 
      className={`icon ` + icon} 
      height={height || 24} 
      width={width || 24} 
      alt="" 
      aria-hidden="true" />
  );
  
};