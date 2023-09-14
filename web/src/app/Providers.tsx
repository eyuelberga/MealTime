"use client";
import { SessionProvider, } from "next-auth/react";
import { Theme } from '@radix-ui/themes';
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Providers = ({ children }: Props) => {
  return <SessionProvider><Theme  
  accentColor="ruby"
  radius="medium">{children}</Theme></SessionProvider>;
};

export default Providers;