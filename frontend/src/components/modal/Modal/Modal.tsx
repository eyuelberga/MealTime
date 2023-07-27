"use client";
import React, { ReactNode } from "react";
import { Button } from "@/components/button";
export interface ModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  children: ReactNode
}

export function Modal({ showModal, setShowModal, children }: ModalProps) {
  return (
    <>
      {showModal ? (
        <>
          <div
            className="overflow-x-hidden overflow-y-auto fixed top-5 inset-0 z-50 outline-none focus:outline-none"
          >
            {children}
          </div>
          <div onClick={() => { setShowModal(false) }} className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
