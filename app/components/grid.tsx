interface propsGrid {
  children: React.ReactNode;
  gap?: number;
  desktop?: number;
  tablet?: number;
  mobile?: number;
}

export default function Grid({
  children, 
  gap = 16,
  desktop = 3,
  tablet = 3,
  mobile = 1
}: propsGrid) {

  return(
    <div className="grid" gap={gap} desktop={desktop} tablet={tablet} mobile={mobile}>
      {children}
    </div>
  );
  
}