import Logo from "../images/d20.png";
import Clipboard from "../images/clipboard.svg";
import Close from "../images/close.svg";
import Copy from "../images/copy.svg";
import Dice from "../images/dice.svg";
import Download from "../images/cloud-download.svg";
import Upload from "../images/cloud-upload.svg";
import Flame from "../images/flame.svg";
import Save from "../images/save.svg";
import Delete from "../images/trash.svg";
import Search from "../images/search.svg";
import Reader from "../images/reader.svg";
import Character from "../images/characters.svg";
import Shield from "../images/shield.svg";
import Timer from "../images/timer.svg";
import Settings from "../images/settings.svg";
import MagicWand from "../images/magic-wand.svg";

interface propsIcons {
  icon: string;
  height?: number;
  width?: number;
}

export default function Icons({ icon, height, width }: propsIcons) {
  const iconType = (type: string) => {
    let url = "error";

    if (type === "logo") url = Logo;
    if (type === "clipboard") url = Clipboard;
    if (type === "close") url = Close;
    if (type === "copy") url = Copy;
    if (type === "dice") url = Dice;
    if (type === "download") url = Download;
    if (type === "upload") url = Upload;
    if (type === "delete") url = Delete;
    if (type === "search") url = Search;
    if (type === "flame") url = Flame;
    if (type === "reader") url = Reader;
    if (type === "save") url = Save;
    if (type === "characters") url = Character;
    if (type === "shield") url = Shield;
    if (type === "timer") url = Timer;
    if (type === "settings") url = Settings;
    if (type === "wand") url = MagicWand;

    return url;
  };

  return (
    <img
      src={iconType(icon)}
      className={`icon ` + icon}
      height={height || 24}
      width={width || 24}
      alt=""
      aria-hidden="true"
    />
  );
}
