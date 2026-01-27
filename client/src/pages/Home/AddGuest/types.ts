import type { IGuestPayload } from "../../../hooks/types";

export type FormProps = {
  onSave: (payload: IGuestPayload) => void;
};

export type GuestFormFields = "name" | "email" | "status" | "plus_ones";

export type FormErrors = Partial<Record<GuestFormFields, string>>;
