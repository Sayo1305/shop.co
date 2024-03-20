"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
  session?: any; // Adjust the type according to the actual session type
};

export const NextAuthProvider = ({ children , session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};