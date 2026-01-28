export interface IGuestPayload {
  id?: string;
  name: string;
  email: string;
  status: string;
  plus_ones?: number;
  is_active?: boolean;
}

export interface ISaveGuestOptions {
  onSuccess?: (data: IGuestPayload) => void;
  onError?: (message: string) => void;
}

export interface IApiErrorResponse {
  message?: string;
}

export interface UseDeleteGuestOptions {
  onSuccess?: (guestId: string) => void;
}
