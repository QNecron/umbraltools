import { useRef } from "react";

import Icons from "./icons";

interface propsDialog {
  children: React.ReactNode;
  type: string;
  triggerIcon?: string;
  triggerCopy: string;
  triggerButton: string;
}

export default function Dialog({
  children, 
  type, 
  triggerIcon,
  triggerCopy, 
  triggerButton
}: propsDialog) {

  const ref = useRef<HTMLDialogElement | null>(null);
  
  return(
    <>
    <button className="btn" button={triggerButton} onClick={() => ref.current?.showModal()}>
      {!triggerIcon &&
        triggerCopy
      }
      {triggerIcon &&
        <>
        <span className="srt">{triggerCopy}</span>
        <Icons icon={triggerIcon} />
        </>
      }
    </button>
    
    <dialog ref={ref} className="dialog" dialog={type}>
      <div className="dialog__content">
        <button className="btn dialog__close" button="icon primary" onClick={() => ref.current?.close()}>
          <span className="srt">Close dialog</span>
          <Icons icon="close" />
        </button>
        {children}
      </div>
    </dialog>
    </>
  );
  
}
