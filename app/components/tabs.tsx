interface propsTabs {
  children?: React.ReactNode;
  classes?: string;
  data: any;
  state: any;
  update: any;
}

export default function Tabs({
  children, 
  classes, 
  data,
  state,
  update
}: propsTabs) {

  return(
    <>
    
    {children}
    
    <div className={classes ? "tabs " + classes : "tabs"}>
      {data.map((info: any, index: any) =>
        <button
          className="btn"
          button="tab primary"
          aria-selected={state === info ? "true" : "false"}
          key={info + '-' + index}
          onClick={() => update(info)}
        >
          {info}
        </button>
      )}
    </div>
    
    </>
  );
  
};