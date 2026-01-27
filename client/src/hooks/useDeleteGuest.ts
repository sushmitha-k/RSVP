import { useState } from "react";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { api } from "../utils/axios";
import {
  RSVP_SERVICES,
  type IApiErrorResponse,
  type UseDeleteGuestOptions,
} from "./types";

export const useDeleteGuest = (options?: UseDeleteGuestOptions) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteGuest = async (guestId: string) => {
    try {
      setIsDeleting(true);
      setError(null);

      const response = await api.delete(RSVP_SERVICES.UPDATE(guestId));

      if (response.status === 200) {
        toast.success("Guest deleted successfully!");
        options?.onSuccess?.(guestId);
      }
    } catch (err) {
      const error = err as AxiosError<IApiErrorResponse>;
      const message =
        error?.response?.data?.message || "Failed to delete guest";

      toast.error(message);
      setError(message);

      throw new Error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteGuest,
    isDeleting,
    error,
  };
};
