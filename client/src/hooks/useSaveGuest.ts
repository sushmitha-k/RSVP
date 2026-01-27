import { useState } from "react";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { api } from "../utils/axios";
import {
  RSVP_SERVICES,
  type IApiErrorResponse,
  type IGuestPayload,
  type ISaveGuestOptions,
} from "./types";

export const useSaveGuest = (options?: ISaveGuestOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveGuest = async (payload: IGuestPayload) => {
    const isEdit = Boolean(payload.id);

    try {
      setIsLoading(true);
      setError(null);

      const { id, ...body } = payload;

      const response = isEdit
        ? await api.put(RSVP_SERVICES.UPDATE(id!), body)
        : await api.post(RSVP_SERVICES.LIST, body);

      options?.onSuccess?.(response.data);
      toast.success(
        isEdit ? "Guest updated successfully" : "Guest added successfully",
      );

      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<IApiErrorResponse>;
      const message =
        axiosError.response?.data?.message ||
        `Failed to ${isEdit ? "update" : "create"} guest`;

      setError(message);
      toast.error(message);
      options?.onError?.(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { saveGuest, isLoading, error };
};
