import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isSuccess: boolean;
  message: string;
}

export const NotificationBar = ({
  isOpen,
  onClose,
  isSuccess,
  message,
}: Props) => (
  <Snackbar open={isOpen} autoHideDuration={6000} onClose={onClose}>
    <Alert
      onClose={onClose}
      severity={isSuccess ? "success" : "error"}
      sx={{ width: "100%" }}
    >
      {message}
    </Alert>
  </Snackbar>
);
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
