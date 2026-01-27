import type { IPaginationProps } from "../types";
import styles from "./index.module.scss";

export const Pagination = ({
  currentPage,
  totalPages,
  onChange,
}: IPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        className={styles.navButton}
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        Previous
      </button>

      <span className={styles.pageInfo}>
        {currentPage} of {totalPages}
      </span>

      <button
        className={styles.navButton}
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
