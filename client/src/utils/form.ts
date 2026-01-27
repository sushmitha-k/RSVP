import type { IGuestPayload } from "../hooks/types";
import type { FormErrors } from "../pages/Home/AddGuest/types";

export const validateGuestForm = (values: IGuestPayload): FormErrors => {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Full name is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  return errors;
};
