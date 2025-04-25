interface propsWrapper {
  children: React.ReactNode;
  type?: string;
}

export default function Wrapper({children, type = "structure"}: propsWrapper) {

  return(
    <div className="wrapper" wrapper={type}>
      {children}
    </div>
  );
  
};