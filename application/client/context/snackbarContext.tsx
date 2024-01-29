import React, { createContext, useContext, useState } from "react";
import SnackBarComponent from "@/components/SnackBarComponent";

interface ModalContextType {
  isSnackbarOpen: boolean;
  openSnackbar: ({ message, severity }: SnackBarDefinitions) => void;
  closeSnackbar: () => void;
}

export type SnackBarDefinitions = {
  message: string;
  severity: "success" | "info" | "warning" | "error";
};

const SnackContext = createContext<ModalContextType | undefined>(undefined);

export const useSnackBar = () => {
  const context = useContext(SnackContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const SnackBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [snackbarMsg, setSnackbarMsg] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("info");

  const openSnackbar = ({ message, severity }: SnackBarDefinitions) => {
    setIsSnackbarOpen(true);
    setSnackbarMsg(message);
    setSnackbarSeverity(severity);
  };

  const closeSnackbar = () => {
    setIsSnackbarOpen(false);
    setSnackbarSeverity("info");
    setSnackbarMsg("");
  };

  return (
    <SnackContext.Provider
      value={{ isSnackbarOpen, openSnackbar, closeSnackbar }}
    >
      <SnackBarComponent
        open={isSnackbarOpen}
        msg={snackbarMsg}
        severity={snackbarSeverity}
        onClose={closeSnackbar}
      />
      {children}
    </SnackContext.Provider>
  );
};
