import Clipboard from "../images/clipboard.svg";
import Close from "../images/close.svg";
import Copy from "../images/copy.svg";
import Dice from "../images/dice.svg";
import Download from "../images/cloud-download.svg";
import Upload from "../images/cloud-upload.svg";
import Flame from "../images/flame.svg";;
import Delete from "../images/skull.svg";
import Search from "../images/search.svg";
import Reader from "../images/reader.svg";

interface propsIcon {
  type: string;
}

export default function Icon({ type }: propsIcon) {

  const Type = (icon: string) => {
    let url = "error"

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

    return url
  }
  
  return(
    <img src={Type(type)} className="icon" alt="" aria-hidden="true" />
  );
  
};