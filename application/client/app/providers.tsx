"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SnackbarProvider } from "@/context/snackbarContext";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
