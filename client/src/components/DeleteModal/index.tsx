import { AlertTriangle } from "lucide-react";
import { useClerk, useUser } from "@clerk/clerk-react";
import classNames from "classnames";

import type { IConfirmDeleteModal } from "../types";
import { ButtonLoader } from "../Loader";
import { MODAL_CONFIG } from "./details";

import styles from "./index.module.scss";

const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
  isLoading,
}: IConfirmDeleteModal) => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  if (!open) return null;

  const isLoggedIn = Boolean(user);
  const config = MODAL_CONFIG[isLoggedIn ? "delete" : "loginRequired"];

  const handlePrimaryAction = () => {
    if (!isLoggedIn) {
      openSignIn();
      onClose();
      return;
    }
    onConfirm();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.icon}>
            <AlertTriangle size={20} />
          </div>

          <div>
            <h3 className={styles.title}>{config.title}</h3>
            <p className={styles.description}>{config.description}</p>
          </div>
        </div>

        <div className={styles.modalActions}>
          <button
            className={styles.button}
            disabled={isLoading}
            onClick={onClose}
          >
            Cancel
          </button>

          <ButtonLoader
            onClick={handlePrimaryAction}
            className={classNames(
              styles.button,
              user ? styles.danger : styles.primary,
            )}
            isLoading={isLoading}
          >
            {config.confirmText}
          </ButtonLoader>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
