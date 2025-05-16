import React, { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  open: boolean
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ open, children }) => {
  const modalRoot = document.getElementById('modal');
  if (!open || !modalRoot) return null;
  return createPortal(
    <ModalContent>{children}</ModalContent>,
    modalRoot
  );
}
interface ModalContentProps {
  children: ReactNode
}

function ModalContent({ children }: ModalContentProps) {
  return (
    <div className='bg-black h-full bg-opacity-60 fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full'>
      <div className="relative w-full h-full grid place-items-center">
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal