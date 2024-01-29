"use client";
import { Alert, Snackbar } from "@mui/material";

export default function SnackBarComponent({
  open,
  onClose,
  msg,
  severity,
}: {
  open: boolean;
  onClose: () => void;
  msg: string;
  severity: "success" | "info" | "warning" | "error";
}) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
}
