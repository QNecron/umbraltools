interface propsInput {
  id: string;
  type: string;
  value?: string;
  min?: number;
  max?: number;
  change?: any;
  disabled?: boolean;
  children?: React.ReactNode;
  label: string;
}

export default function Input({
  id,
  type,
  value,
  min,
  max, 
  change,
  disabled,
  children,
  label
}: propsInput) {
  
  return(
    <div className="input" input={type}>
      
      {type === "input" &&
        <input 
          id={id}
          type={type}
          value={value} 
          autoComplete="off" 
          min={min}
          max={max}
          onChange={change}
          className="input__field"
          disabled={disabled} 
        />
      }
      
      {type === "select" &&
        <>
          <select
          id={id} 
          value={value} 
          autoComplete="off" 
          onChange={change} 
          className="input__field" 
          disabled={disabled}
          >
            {children}  
          </select>
          <div className="input__icon">
            &rsaquo;
          </div>
        </>
      }
      
      <label htmlFor={id} className="input__label">
        {label}
      </label>
      
    </div>
  );
  
}