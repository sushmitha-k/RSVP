import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useSaveGuest } from "../../../hooks/useSaveGuest";
import { ButtonLoader } from "../../../components/Loader";
import { useGuestContext } from "../../../context";
import { validateGuestForm } from "../../../utils/form";
import type { IGuestPayload } from "../../../hooks/types";
import { useGuestList } from "../../../context/GuestListContext";
import type { FormErrors } from "./types";

import styles from "./index.module.scss";

const Form = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const { editingGuest, clearEdit } = useGuestContext();
  const { refetch } = useGuestList();
  const formRef = useRef<HTMLFormElement>(null);

  const { isLoading, saveGuest } = useSaveGuest({
    onSuccess: () => {
      clearEdit();
      refetch();
      formRef.current?.reset();
    },
  });

  useEffect(() => {
    if (!editingGuest) formRef.current?.reset();
  }, [editingGuest]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const values: IGuestPayload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      status: String(formData.get("status") || "pending"),
      plus_ones: Number(formData.get("plus_ones") || 0),
    };

    const validationErrors = validateGuestForm(values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    saveGuest(editingGuest ? { ...values, id: editingGuest.id } : values);
    setErrors({});
  };

  return (
    <form
      ref={formRef}
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={styles.field}>
        <label className={styles.label}>FULL NAME</label>
        <input
          name="name"
          className={styles.input}
          placeholder="Enter guest name"
          defaultValue={editingGuest?.name ?? ""}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>EMAIL ADDRESS</label>
        <input
          name="email"
          type="email"
          className={styles.input}
          placeholder="john@example.com"
          defaultValue={editingGuest?.email ?? ""}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>STATUS</label>
        <select
          name="status"
          className={styles.select}
          defaultValue={editingGuest?.status ?? "pending"}
        >
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>PLUS-ONES</label>
        <input
          name="plus_ones"
          type="number"
          min={0}
          className={styles.input}
          defaultValue={editingGuest?.plus_ones ?? 0}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.labelPlaceholder} />
        <div className={styles.actionBtns}>
          <ButtonLoader
            type="submit"
            className={styles.submitButton}
            isLoading={isLoading}
          >
            {editingGuest ? "Update" : "Register Guest"}
          </ButtonLoader>

          {editingGuest && (
            <button
              type="button"
              onClick={() => {
                clearEdit();
                setErrors({});
              }}
              className={styles.cancelButton}
            >
              <X />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Form;
