interface propsAccordion {
  children: React.ReactNode;
  id: string;
  accordion?: string;
  open: boolean;
  title: string;
  button: string;
}

export default function Accordion({
  children,
  id,
  accordion,
  open,
  title,
  button
}: propsAccordion) {

  return(
    <details 
      id={id} 
      className="accordion" 
      accordion={accordion || "default"} 
      open={open}
    >
      
      <summary className="accordion__title btn" button={button}>
        {title}
      </summary>
      
      <div className="accordion__content">
        {children}
      </div>
      
    </details>
  );
  
}