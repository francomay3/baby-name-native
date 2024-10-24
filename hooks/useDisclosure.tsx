import { useState, useCallback } from "react";

interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  setOpen: (value: boolean) => void;
}

const useDisclosure = (initialState: boolean = false): UseDisclosureReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const setOpen = useCallback((value: boolean) => setIsOpen(value), []);

  return { isOpen, onOpen, onClose, onToggle, setOpen };
};

export default useDisclosure;
