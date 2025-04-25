import Wrapper from "./wrapper";

export default function Footer() {

  return(
    <footer id="footer" className="footer" role="contentinfo">
      <Wrapper>
        <p className="footer__copy">
          Umbral Tools is an independenmt product published under the Shadowdark RPG 
          Thrid-Partry License and is not affiliated with The Arcane Library, LLC. 
          Shadow RPG &copy; {(new Date().getFullYear())} The Arcane Library.  
        </p>
      </Wrapper>
    </footer>
  );
  
};