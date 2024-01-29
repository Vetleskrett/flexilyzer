"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SnackBarProvider } from "@/context/snackbarContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SnackBarProvider>{children}</SnackBarProvider>
    </NextUIProvider>
  );
}
