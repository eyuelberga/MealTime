"use client";
import React, { ReactNode, useEffect } from "react";
import { Button } from "@radix-ui/themes";
export interface ModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  children: ReactNode
}

export function Modal({ showModal, setShowModal, children }: ModalProps) {
  useEffect(() => {
    if (showModal) {
      (window as any).my_modal.showModal()
    }
    else{

    }
  }, [showModal])
  return (
    <>
      <dialog id="my_modal" className="modal">
        <form method="dialog" className="modal-box">
         {children}
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* {showModal ? (
        <>
          <div
            className="modal"
          >
            {children}
          </div>
          <div onClick={() => { setShowModal(false) }} className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null} */}
    </>
  );
}
