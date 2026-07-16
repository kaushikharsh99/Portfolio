import * as React from "react";
import { ResumeModal } from "./ResumeModal";

type ResumeModalContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ResumeModalContext = React.createContext<ResumeModalContextType | undefined>(undefined);

export function ResumeModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ResumeModalContext.Provider value={{ isOpen, open, close }}>
      {children}
      <ResumeModal isOpen={isOpen} onClose={close} />
    </ResumeModalContext.Provider>
  );
}

export function useResumeModal() {
  const context = React.useContext(ResumeModalContext);
  if (!context) {
    throw new Error("useResumeModal must be used within a ResumeModalProvider");
  }
  return context;
}
