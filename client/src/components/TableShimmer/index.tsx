import styles from "./index.module.scss";

const ROWS = 5;

export const GuestTableShimmer = () => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Guest Name</th>
            <th>Status</th>
            <th>Plus Ones</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: ROWS }).map((_, index) => (
            <tr key={index}>
              <td>
                <div className={styles.guestCell}>
                  <div className={styles.avatar} />

                  <div className={styles.textBlock}>
                    <div className={styles.line} />
                    <div className={`${styles.line} ${styles.small}`} />
                  </div>
                </div>
              </td>

              <td>
                <div className={styles.statusPill} />
              </td>

              <td>
                <div className={`${styles.line} ${styles.medium}`} />
              </td>

              <td>
                <div className={styles.actions}>
                  <div className={styles.action} />
                  <div className={styles.action} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
