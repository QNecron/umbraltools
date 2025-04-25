interface propsGrid {
  children: React.ReactNode;
  desktop?: number;
  tablet?: number;
  mobile?: number;
}

export default function Grid({
  children, 
  desktop = 3,
  tablet = 3,
  mobile = 1
}: propsGrid) {

  return(
    <div className="grid" desktop={desktop} tablet={tablet} mobile={mobile}>
      {children}
    </div>
  );
  
};