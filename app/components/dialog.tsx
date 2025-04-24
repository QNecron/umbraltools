import { useRef } from "react";

import Icons from "./icons";

interface propsDialog {
  children: React.ReactNode;
  type: string;
  triggerCopy: string;
  triggerButton: string;
}

export default function Dialog({children, type, triggerCopy, triggerButton}: propsDialog) {

  const ref = useRef<HTMLDialogElement | null>(null);
  
  return(
    <>
    <button className="btn" button={triggerButton} onClick={() => ref.current?.showModal()}>
      {triggerCopy}
    </button>
    
    <dialog ref={ref} className="dialog" dialog={type}>
      <div className="dialog__content">
        <button className="btn dialog__close" button="icon secondary" onClick={() => ref.current?.close()}>
          <span className="srt">Close dialog</span>
          <Icons icon="close" height={22} width={22} />
        </button>
        {children}
      </div>
    </dialog>
    </>
  );
  
};