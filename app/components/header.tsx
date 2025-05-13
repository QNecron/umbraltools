import { Link } from "@remix-run/react";

import Wrapper from "./wrapper";
import Icons from "./icons";
import Dialog from "./dialog";

import MenuData from "../data/menu.json";

export default function Header() {
  
  return(
    <header id="header" className="header" role="banner">
      <Wrapper type="structure">
        <nav className="header__nav" aria-label="Site navigation" role="navigation">
          <Icons icon="logo" height={40} width={40} />
          <Dialog type="primary" triggerCopy="Menu" triggerButton="primary">
            <ul className="nav">
              {MenuData.map((menu, index) => { 
                return(
                  <li className="nav__item" key={index}>
                    <Link to={menu.url} className="nav__link btn" button="primary">
                      {menu.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Dialog>
        </nav>
      </Wrapper>
    </header>
  );
  
};