import Wrapper from "./wrapper";

export default function Footer() {

  return(
    <footer id="footer" className="footer" role="contentinfo">
    
      <Wrapper>
      
        <p className="footer__copy">
          Umbral Tools &copy; {(new Date().getFullYear())} 
        </p>
        
      </Wrapper>
      
    </footer>
  );
  
}
