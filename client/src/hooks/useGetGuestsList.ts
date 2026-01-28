import { useState } from "react";
import type { AxiosError } from "axios";

import type { IGuest } from "../pages/Home/GuestList/types";
import { api } from "../utils/axios";
import { type IApiErrorResponse } from "./types";
import { RSVP_SERVICES } from "./services";

export const useGetGuestsList = () => {
  const [guests, setGuests] = useState<IGuest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGuests = async (query?: string) => {
    try {
      setIsLoading(true);
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
  };

  return {
    guests,
    isLoading,
    error,
    fetchGuests,
  };
};
