import { EmptyState } from "../../components/EmptyStates";
import styles from "./index.module.scss";
import type { IGuestTableProps } from "../types";

export const GuestTable = ({
  guests,
  startEdit,
  onDelete,
}: IGuestTableProps) => {
  if (guests.length === 0) {
    return (
      <tbody>
        <tr className={styles.row}>
          <td colSpan={4} className={styles.emptyState}>
            <EmptyState />
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {guests.map((guest) => (
        <tr key={guest.id} className={styles.row}>
          <td className={styles.cell}>
            <div className={styles.guestCell}>
              {guest.isNew && <span className={styles.dot} />}
              <div className={styles.avatar}>
                <p>{guest.name.charAt(0)}</p>
              </div>
              <div>
                <div className={styles.nameRow}>
                  <strong>{guest.name}</strong>
                  {guest.isNew && <span className={styles.newBadge}>NEW</span>}
                </div>
                <span className={styles.email}>{guest.email}</span>
              </div>
            </div>
          </td>

          <td className={styles.cell} data-label="Status">
            <span className={`${styles.status} ${styles[guest.status]}`}>
              {guest.status}
            </span>
          </td>

          <td
            className={`${styles.cell} ${styles.plusOnes}`}
            data-label="Plus Ones"
          >
            {guest.plus_ones > 0
              ? `+${guest.plus_ones} Guest${guest.plus_ones !== 1 ? "s" : ""}`
              : "-"}
          </td>

          <td className={styles.cell} data-label="Actions">
            <div className={styles.actions}>
              <button
                className={styles.editButton}
                onClick={() => startEdit(guest)}
              >
                Edit
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => onDelete(guest)}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
