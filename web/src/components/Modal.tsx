import { createPortal } from "react-dom";

const Modal = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!open) return null;

  return createPortal(
    <div
      className="w-full h-screen fixed top-0 left-0 bg-black/50 flex items-center justify-center z-100"
      onClick={onClose}
    >
      {children}
    </div>,
    document.body
  );
};

export default Modal;
