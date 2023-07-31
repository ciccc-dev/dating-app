import { useState } from "react";

export const useDialogState = (): readonly [
  boolean,
  { open: () => void; close: () => void }
] => {
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return [isOpen, { open, close }];
};
