import { useState, useCallback } from "react";

interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  setOpen: (value: boolean) => void;
  openFor: (duration: number) => void;
}

const useDisclosure = (initialState: boolean = false): UseDisclosureReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const setOpen = useCallback((value: boolean) => setIsOpen(value), []);
  const openFor = useCallback((duration: number) => {
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), duration);
  }, []);

  return { isOpen, onOpen, onClose, onToggle, setOpen, openFor };
};

export default useDisclosure;
