import React, { useRef, useEffect } from "react";

type ModalProps = {
  open: boolean;
  center?: boolean;
  handleClose: Function;
  children: React.ReactNode;
};

const Modal = ({ open, center, handleClose, children }: ModalProps) => {
  const ref = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleClickBackground = (event: any) => {
    if (event.target === ref.current) {
      handleClose(event);
    }
  };

  return (
    <>
      {open && (
        <div
          ref={ref}
          className={`fixed top-0 left-0 h-screen w-screen z-50 bg-slate-500/75 ${
            open ? "block" : "hidden"
          } ${center ? "flex justify-center items-center" : ""}`}
          onClick={handleClickBackground}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Modal;
