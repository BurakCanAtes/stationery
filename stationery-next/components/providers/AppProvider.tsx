'use client';

import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

import queryClient from "../../lib/tools/queryClientOptions";

export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}