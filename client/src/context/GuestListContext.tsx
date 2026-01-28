/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useCallback,
  useState,
  type ReactNode,
} from "react";
import type { AxiosError } from "axios";
import type { IGuest } from "../pages/Home/GuestList/types";
import { RSVP_SERVICES } from "../hooks/services";
import type { IApiErrorResponse } from "../hooks/types";
import { api } from "../utils/axios";

interface GuestListContextValue {
  guests: IGuest[];
  isLoading: boolean;
  error: string | null;
  fetchGuests: (query?: string) => Promise<void>;
  refetch: () => Promise<void>;
}

const GuestListContext = createContext<GuestListContextValue | undefined>(
  undefined,
);

interface GuestListProviderProps {
  children: ReactNode;
}

export const GuestListProvider = ({ children }: GuestListProviderProps) => {
  const [guests, setGuests] = useState<IGuest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGuests = useCallback(async (query?: string, showLoader = true) => {
    try {
      setIsLoading(showLoader);
      setError(null);

      const response = query
        ? await api.get(RSVP_SERVICES.SEARCH_LIST, { params: { q: query } })
        : await api.get(RSVP_SERVICES.LIST);

      setGuests(response.data);
    } catch (err) {
      const error = err as AxiosError<IApiErrorResponse>;
      setError(error?.response?.data?.message || "Failed to fetch guests");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(
    () => fetchGuests(undefined, false),
    [fetchGuests],
  );

  return (
    <GuestListContext.Provider
      value={{
        guests,
        isLoading,
        error,
        fetchGuests,
        refetch,
      }}
    >
      {children}
    </GuestListContext.Provider>
  );
};

export const useGuestList = () => {
  const context = useContext(GuestListContext);

  if (!context) {
    throw new Error("useGuestList must be used within GuestListProvider");
  }

  return context;
};
