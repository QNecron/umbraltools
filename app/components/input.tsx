interface propsInput {
  id: string;
  classes?: string;
  type: string;
  accept?: string;
  value?: string;
  min?: number;
  max?: number;
  cols?: number;
  rows?: number;
  change?: (e: any) => void;
  checked?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  label: string;
  minimal?: boolean;
}

export default function Input({
  id,
  classes,
  type,
  accept,
  value,
  min,
  max,
  cols,
  rows = 8,
  change,
  checked,
  disabled,
  children,
  label,
  minimal,
}: propsInput) {
  let classList = classes ? "input " + classes : "input";

  if (type == "select") {
    return (
      <div className={classList} input={type}>
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
        <div className="input__icon">&rsaquo;</div>
        <label
          htmlFor={id}
          className={"input__label" + (minimal === true ? " srt" : "")}
        >
          {label}
        </label>
      </div>
    );
  } else if (type == "textarea") {
    return (
      <div className={classList} input={type}>
        <textarea
          id={id}
          value={value}
          cols={cols}
          rows={rows}
          autoComplete="off"
          onChange={change}
          className="input__field"
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className={"input__label" + (minimal === true ? " srt" : "")}
        >
          {label}
        </label>
      </div>
    );
  } else {
    return (
      <div className={classList} input={type}>
        <input
          id={id}
          type={type}
          accept={accept}
          value={value}
          autoComplete="off"
          min={min}
          max={max}
          onChange={change}
          className="input__field"
          checked={checked}
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className={"input__label" + (minimal === true ? " srt" : "")}
        >
          {label}
        </label>
      </div>
    );
  }
}
