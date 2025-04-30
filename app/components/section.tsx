interface propsSection {
  children: React.ReactNode;
  padding?: string;
  theme?: string;
  heading?: number;
  title?: string;
}

export default function Section({
  children, 
  padding = "both", 
  theme = "default",
  heading = 2,
  title
}: propsSection) {

  const Title = heading === 1 ? "h1" : "h2";
  
  return(
    <section className="section" section={padding + " " + theme}>
      
      {title && 
        <header className="section__header">
          <Title className="section__title" heading="3">
            {title}
          </Title>
        </header>
      }
      
      {children}

    </section>
  );
  
};  