/* eslint-disable react-refresh/only-export-components */
import type { IGuest } from "../pages/Home/GuestList/types";
import { createContext, useContext, useState, type ReactNode } from "react";

interface GuestContextValue {
  refetchList: () => void;
  editingGuest: IGuest | null;
  startEdit: (guest: IGuest) => void;
  clearEdit: () => void;
}

const GuestContext = createContext<GuestContextValue | undefined>(undefined);

interface GuestProviderProps {
  children: ReactNode;
  refetchList: () => void;
}

export const GuestProvider = ({
  children,
  refetchList,
}: GuestProviderProps) => {
  const [editingGuest, setEditingGuest] = useState<IGuest | null>(null);

  const startEdit = (guest: IGuest) => setEditingGuest(guest);
  const clearEdit = () => setEditingGuest(null);

  return (
    <GuestContext.Provider
      value={{
        editingGuest,
        startEdit,
        clearEdit,
        refetchList,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
};

export const useGuestContext = () => {
  const context = useContext(GuestContext);

  if (!context) {
    throw new Error("useGuestContext must be used within GuestProvider");
  }

  return context;
};
