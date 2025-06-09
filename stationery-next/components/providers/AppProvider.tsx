import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import queryClient from "../../lib/tools/queryClientOptions";

export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}