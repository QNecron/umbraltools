import Wrapper from "./wrapper";
import Icons from "./icons";
import Dialog from "./dialog";

export default function Header() {
  
  return(
    <header id="header" className="header" role="banner">
      <Wrapper type="structure">
        <nav className="header__nav" aria-label="Site navigation" role="navigation">
          <Icons icon="logo" />
          <Dialog type="primary" triggerCopy="Menu" triggerButton="primary">
            Hello World.
          </Dialog>
        </nav>
      </Wrapper>
    </header>
  );
  
};