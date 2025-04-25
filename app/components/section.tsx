interface propsSection {
  children: React.ReactNode;
  padding?: string;
  theme?: string;
}

export default function Wrapper({children, padding = "both", theme = "default"}: propsSection) {

  return(
    <section className="section" section={padding + " " + theme}>
      {children}
    </section>
  );
  
};  