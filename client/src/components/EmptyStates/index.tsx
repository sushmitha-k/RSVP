import { Users } from "lucide-react";

import styles from "./index.module.scss";

export const EmptyState = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <Users className={styles.icon} />
      </div>
      <h4 className={styles.title}>No guests found</h4>
      <p className={styles.message}>
        We couldn’t find anything to display. <br />
        Try changing your search or adding new items.
      </p>
    </div>
  );
};
